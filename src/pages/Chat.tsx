import { Buffer } from "buffer";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import * as TweetNaCl from "tweetnacl";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { io, Socket } from "socket.io-client";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  Lock,
  AlertCircle,
  CheckCheck,
  Check,
} from "lucide-react";

window.Buffer = Buffer;

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  encryptedContent: string;
  senderPublicKey: string;
  content: string;
  timestamp: Date;
  status: "sending" | "sent" | "delivered" | "read";
  isEncrypted: boolean;
}

interface KeyPair {
  publicKey: string;
  privateKey: string;
}

const Chat = () => {
  const { user, name, partnerId, partnerName } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [myKeyPair, setMyKeyPair] = useState<KeyPair | null>(null);
  const [partnerPublicKey, setPartnerPublicKey] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const server = import.meta.env.VITE_SERVER_URL;

  // Utility helpers for encryption
  const base64ToUint8 = (b64: string) =>
    new Uint8Array(Buffer.from(b64, "base64"));
  const uint8ToBase64 = (u8: Uint8Array) => Buffer.from(u8).toString("base64");

  const encryptMessage = (
    message: string,
    recipientPublicKeyBase64: string,
    mySecretKeyBase64: string
  ): string => {
    const recipientPub = base64ToUint8(recipientPublicKeyBase64);
    const mySecret = base64ToUint8(mySecretKeyBase64);
    const msgUint8 = new TextEncoder().encode(message);
    const nonce = TweetNaCl.randomBytes(TweetNaCl.box.nonceLength);
    const encrypted = TweetNaCl.box(msgUint8, nonce, recipientPub, mySecret);
    if (!encrypted) throw new Error("encryption failed");

    const combined = new Uint8Array(nonce.length + encrypted.length);
    combined.set(nonce, 0);
    combined.set(encrypted, nonce.length);

    return uint8ToBase64(combined);
  };


  // const decryptMessage = (
  //   encryptedStr: string,
  //   senderPublicKey: string,
  //   myPrivateKey: string
  // ): string => {
  //   const combined = base64ToUint8(encryptedStr);
  //   const nonce = combined.slice(0, TweetNaCl.box.nonceLength);
  //   const encrypted = combined.slice(TweetNaCl.box.nonceLength);
  //   const senderPub = base64ToUint8(senderPublicKey);
  //   const myPriv = base64ToUint8(myPrivateKey);

  //   const decrypted = TweetNaCl.box.open(encrypted, nonce, senderPub, myPriv);
  //   if (!decrypted) throw new Error("Decryption failed");
  //   return new TextDecoder().decode(decrypted);
  // };

  
  
  
  // Debuging Started 
  const decryptMessage = (
    encryptedStr: string,
    senderPublicKey: string,
    myPrivateKey: string
  ): string => {
    try {
      console.log("🔍 Decrypting:", {
        encryptedLength: encryptedStr.length,
        senderPubKeyPrefix: senderPublicKey.substring(0, 20),
        myPrivKeyPrefix: myPrivateKey.substring(0, 20),
      });

      const combined = base64ToUint8(encryptedStr);
      console.log("Combined length:", combined.length);
      
      const nonce = combined.slice(0, TweetNaCl.box.nonceLength);
      const encrypted = combined.slice(TweetNaCl.box.nonceLength);
      
      console.log("Nonce length:", nonce.length, "Expected:", TweetNaCl.box.nonceLength);
      console.log("Encrypted data length:", encrypted.length);
      
      const senderPub = base64ToUint8(senderPublicKey);
      const myPriv = base64ToUint8(myPrivateKey);
      
      console.log("Sender pub length:", senderPub.length, "My priv length:", myPriv.length);
      
      const decrypted = TweetNaCl.box.open(encrypted, nonce, senderPub, myPriv);
      
      if (!decrypted) {
        console.error("❌ TweetNaCl.box.open returned null");
        console.error("This usually means:");
        console.error("1. Wrong sender public key");
        console.error("2. Wrong recipient private key");
        console.error("3. Corrupted encrypted data");
        console.error("4. Nonce or encrypted data was modified");
        throw new Error("Decryption failed - authentication failed");
      }
      
      const decoded = new TextDecoder().decode(decrypted);
      console.log("✅ Decrypted successfully:", decoded);
      return decoded;
    } catch (error) {
      console.error("💥 Decryption error:", error);
      throw error;
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  // Generate key pair on mount
  // useEffect(() => {
  //   const generateKeyPair = async () => {
  //     try {
  //       const keyPair = TweetNaCl.box.keyPair();
  //       const publicKeyStr = Buffer.from(keyPair.publicKey).toString("base64");
  //       const privateKeyStr = Buffer.from(keyPair.secretKey).toString("base64");
  //       setMyKeyPair({ publicKey: publicKeyStr, privateKey: privateKeyStr });
  //     } catch (error) {
  //       console.error("Key generation failed:", error);
  //       toast.error("Encryption setup failed");
  //     }
  //   };
  //   generateKeyPair();
  // }, []);






  
  // Debugging Started -- KeyPair Generation 
    // Generate key pair on mount
  // Generate key pair on mount
// Generate key pair on mount
useEffect(() => {
  const generateKeyPair = async () => {
    try {
      // Check if we already have a key pair in localStorage
      const storedPublicKey = localStorage.getItem(`publicKey_${user?.id}`);
      const storedPrivateKey = localStorage.getItem(`privateKey_${user?.id}`);

      if (storedPublicKey && storedPrivateKey) {
        // Validate key lengths before using
        const pubDecoded = base64ToUint8(storedPublicKey);
        const privDecoded = base64ToUint8(storedPrivateKey);
        
        console.log("📋 Stored keys check:", {
          publicKeyLength: storedPublicKey.length,
          privateKeyLength: storedPrivateKey.length,
          publicKeyBytesLength: pubDecoded.length,
          privateKeyBytesLength: privDecoded.length,
        });
        
        if (pubDecoded.length === 32 && privDecoded.length === 32) {
          console.log("✅ Using stored key pair for user:", user?.id);
          console.log("Public key (full):", storedPublicKey);
          console.log("Private key (full):", storedPrivateKey);
          setMyKeyPair({ 
            publicKey: storedPublicKey, 
            privateKey: storedPrivateKey 
          });
          return;
        } else {
          console.warn("⚠️ Stored keys are invalid, regenerating...");
          localStorage.removeItem(`publicKey_${user?.id}`);
          localStorage.removeItem(`privateKey_${user?.id}`);
        }
      }

      // Generate new keys
      console.log("🔑 Generating new key pair for user:", user?.id);
      const keyPair = TweetNaCl.box.keyPair();
      const publicKeyStr = uint8ToBase64(keyPair.publicKey);
      const privateKeyStr = uint8ToBase64(keyPair.secretKey);
      
      console.log("✅ Generated keys:");
      console.log("  - Public key bytes:", keyPair.publicKey.length);
      console.log("  - Secret key bytes:", keyPair.secretKey.length);
      console.log("  - Public key (base64):", publicKeyStr.length, "chars");
      console.log("  - Private key (base64):", privateKeyStr.length, "chars");
      console.log("  - Public key (full):", publicKeyStr);
      console.log("  - Private key (full):", privateKeyStr);
      
      // Verify lengths
      if (keyPair.publicKey.length !== 32 || keyPair.secretKey.length !== 32) {
        throw new Error("Generated keys have wrong byte length!");
      }
      
      // Store in localStorage
      localStorage.setItem(`publicKey_${user?.id}`, publicKeyStr);
      localStorage.setItem(`privateKey_${user?.id}`, privateKeyStr);
      
      setMyKeyPair({ publicKey: publicKeyStr, privateKey: privateKeyStr });
      
      console.log("✅ New key pair stored successfully");
    } catch (error) {
      console.error("Key generation failed:", error);
      toast.error("Encryption setup failed");
    }
  };
  
  if (user?.id) {
    generateKeyPair();
  }
}, [user?.id]);






















  // Initialize socket.io
  // useEffect(() => {
  //   if (!myKeyPair) return;

  //   const newSocket = io(server, {
  //     transports: ["websocket"],
  //     withCredentials: true,
  //     reconnection: true,
  //     reconnectionAttempts: 5,
  //     reconnectionDelay: 1000,
  //   });

  //   newSocket.on("connect", () => {
  //     console.log("✅ Connected to server:", newSocket.id);
  //     setConnectionStatus("connected");
  //     toast.success("🔐 Connected Securely");

  //     // identify this user
  //     if (user?.id) {
  //       newSocket.emit("identify", user.id);
  //     }

  //     // register key on connection
  //     if (user?.id && myKeyPair?.publicKey) {
  //       newSocket.emit("register_key", {
  //         userId: user.id,
  //         publicKey: myKeyPair.publicKey,
  //       });
  //     }

  //     // request partner key
  //     if (partnerId) {
  //       newSocket.emit("request_partner_key", { partnerId });
  //     }
  //   });

  //   // receive partner key
  //   newSocket.on("partner_key", (data: { publicKey: string }) => {
  //     if (data.publicKey) {
  //       setPartnerPublicKey(data.publicKey);
  //       console.log("📥 Partner key received");
  //     } else {
  //       console.warn("Partner key not found on server.");
  //     }
  //   });

  //   // receive encrypted message
  //   newSocket.on("receive_message", (msg) => {
  //     try {
  //       if (!myKeyPair?.privateKey) {
  //         toast.error("Decryption key not ready");
  //         return;
  //       }

  //       if (!msg?.encryptedContent || !msg?.senderPublicKey) {
  //         console.warn(
  //           "Received message missing encryptedContent or senderPublicKey",
  //           msg
  //         );
  //         return;
  //       }

  //       const plaintext = decryptMessage(
  //         msg.encryptedContent,
  //         msg.senderPublicKey,
  //         myKeyPair.privateKey
  //       );

  //       const newMsg: Message = {
  //         ...msg,
  //         content: plaintext,
  //         timestamp: new Date(msg.timestamp),
  //         status: "delivered",
  //         isEncrypted: true,
  //       };

  //       setMessages((prev) => [...prev, newMsg]);
  //       newSocket.emit("message_read", {
  //         senderId: msg.senderId,
  //         messageId: msg.id,
  //       });
  //     } catch (err) {
  //       console.error("Decryption failed:", err);
  //       toast.error("Message decryption failed");
  //     }
  //   });

  //   // read receipts
  //   // newSocket.on('message_read', (data: { messageId: string }) => {
  //   //   setMessages((prev) =>
  //   //     prev.map((m) => (m.id === data.messageId ? { ...m, status: 'read' } : m))
  //   //   );
  //   // });

  //   // DELIVERY ACK (server notifies sender that message is delivered)
  //   newSocket.on("message_delivered", (data: { messageId: string }) => {
  //     if (!data?.messageId) return;
  //     setMessages((prev) =>
  //       prev.map((m) =>
  //         m.id === data.messageId ? { ...m, status: "delivered" } : m
  //       )
  //     );
  //   });

  //   // READ ACK
  //   newSocket.on("message_read", (data: { messageId: string }) => {
  //     if (!data?.messageId) return;
  //     setMessages((prev) =>
  //       prev.map((m) =>
  //         m.id === data.messageId ? { ...m, status: "read" } : m
  //       )
  //     );
  //   });

  //   // typing indicators
  //   newSocket.on("partner_typing", () => setIsTyping(true));
  //   newSocket.on("partner_stop_typing", () => setIsTyping(false));

  //   // disconnect
  //   newSocket.on("disconnect", () => {
  //     setConnectionStatus("disconnected");
  //     toast.error("Connection lost ❌");
  //   });

  //   setSocket(newSocket);

  //   // return () => newSocket.close();
  //   return () => {
  //     newSocket.close();
  //   };
  // }, [myKeyPair, user?.id, partnerId, server]);




// Debug -- Initializiation 
  // Initialize socket.io
  useEffect(() => {
    if (!myKeyPair) return;

    const newSocket = io(server, {
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("✅ Connected to server:", newSocket.id);
      setConnectionStatus("connected");
      toast.success("🔐 Connected Securely");

      // identify this user
      if (user?.id) {
        newSocket.emit("identify", user.id);
        console.log("👤 Identified as:", user.id);
      }

      // register key on connection - THIS IS CRITICAL
      if (user?.id && myKeyPair?.publicKey) {
        console.log("🔑 Registering public key:", myKeyPair.publicKey.substring(0, 20));
        newSocket.emit("register_key", {
          userId: user.id,
          publicKey: myKeyPair.publicKey,
        });
      }

      // request partner key AFTER registering our own
      if (partnerId) {
        console.log("📞 Requesting partner key for:", partnerId);
        newSocket.emit("request_partner_key", { partnerId });
      }
    });

    // receive partner key
    newSocket.on("partner_key", (data: { publicKey: string }) => {
      if (data.publicKey) {
        console.log("📥 Partner key received:", data.publicKey.substring(0, 20));
        setPartnerPublicKey(data.publicKey);
        toast.success("🔐 Partner key received");
      } else {
        console.warn("❌ Partner key not found on server.");
        toast.error("Partner hasn't connected yet");
      }
    });

    // receive encrypted message
    newSocket.on("receive_message", (msg) => {
      try {
        console.log("📨 Received encrypted message from:", msg.senderId);
        
        if (!myKeyPair?.privateKey) {
          console.error("❌ My private key not ready");
          toast.error("Decryption key not ready");
          return;
        }

        if (!msg?.encryptedContent || !msg?.senderPublicKey) {
          console.warn("❌ Message missing required fields", msg);
          return;
        }

        console.log("🔓 Attempting decryption with:");
        console.log("  - Sender's public key:", msg.senderPublicKey.substring(0, 20));
        console.log("  - My private key:", myKeyPair.privateKey.substring(0, 20));

        const plaintext = decryptMessage(
          msg.encryptedContent,
          msg.senderPublicKey,
          myKeyPair.privateKey
        );

        const newMsg: Message = {
          ...msg,
          content: plaintext,
          timestamp: new Date(msg.timestamp),
          status: "delivered",
          isEncrypted: true,
        };

        setMessages((prev) => [...prev, newMsg]);
        newSocket.emit("message_read", {
          senderId: msg.senderId,
          messageId: msg.id,
        });
      } catch (err) {
        console.error("❌ Decryption failed:", err);
        toast.error("Message decryption failed");
      }
    });

    // DELIVERY ACK (server notifies sender that message is delivered)
    newSocket.on("message_delivered", (data: { messageId: string }) => {
      if (!data?.messageId) return;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === data.messageId ? { ...m, status: "delivered" } : m
        )
      );
    });

    // READ ACK
    newSocket.on("message_read", (data: { messageId: string }) => {
      if (!data?.messageId) return;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === data.messageId ? { ...m, status: "read" } : m
        )
      );
    });

    // typing indicators
    newSocket.on("partner_typing", () => setIsTyping(true));
    newSocket.on("partner_stop_typing", () => setIsTyping(false));

    // disconnect
    newSocket.on("disconnect", () => {
      setConnectionStatus("disconnected");
      toast.error("Connection lost ❌");
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [myKeyPair, user?.id, partnerId, server]);



  // Scroll to bottom on message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Typing handler
  const handleTyping = () => {
    if (!socket) return;
    socket.emit("user_typing", { to: partnerId });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("user_stop_typing", { to: partnerId });
    }, 1000);
  };

  // Send message
  // const handleSendMessage = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!user.id) {
  //     console.log("data", user);
  //     toast.error("User not authenticated");
  //     return;
  //   }

  //   if (!partnerId) {
  //     toast.error("Partner not selected");
  //     return;
  //   }

  //   if (!socket || !socket.connected) {
  //     toast.error("Not connected to server");
  //     return;
  //   }
  //   if (!partnerPublicKey) {
  //     toast.error("Partner encryption key not available");
  //     return;
  //   }
  //   if (!myKeyPair) {
  //     toast.error("Your encryption key not ready");
  //     return;
  //   }
  //   if (!inputValue.trim()) {
  //     return;
  //   }

  //   const id = uuidv4();
  //   const encrypted = encryptMessage(
  //     inputValue,
  //     partnerPublicKey,
  //     myKeyPair.privateKey
  //   );

  //   const msg: Message = {
  //     id,
  //     senderId: user?.id || "",
  //     senderName: name,
  //     recipientId: partnerId,
  //     encryptedContent: encrypted,
  //     senderPublicKey: myKeyPair.publicKey,
  //     content: inputValue,
  //     timestamp: new Date(),
  //     status: "sending",
  //     isEncrypted: true,
  //   };

    
  //   setMessages((prev) => [...prev, msg]);

  //   socket.emit("send_message", msg);
    
  //   // setMessages((prev) =>
  //   //   prev.map((m) => (m.id === msg.id ? { ...m, status: "sent" } : m))
  //   // );

  //   setInputValue("");
  // };


  // Debug -----  
  // Send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.id) {
      console.log("data", user);
      toast.error("User not authenticated");
      return;
    }

    if (!partnerId) {
      toast.error("Partner not selected");
      return;
    }

    if (!socket || !socket.connected) {
      toast.error("Not connected to server");
      return;
    }
    if (!partnerPublicKey) {
      toast.error("Partner encryption key not available");
      return;
    }
    if (!myKeyPair) {
      toast.error("Your encryption key not ready");
      return;
    }
    if (!inputValue.trim()) {
      return;
    }

    try {
      const id = uuidv4();
      
      console.log("🔐 Encrypting with:", {
        message: inputValue,
        partnerPubKeyPrefix: partnerPublicKey.substring(0, 20),
        myPrivKeyPrefix: myKeyPair.privateKey.substring(0, 20),
        myPubKey: myKeyPair.publicKey.substring(0, 20),
      });

      const encrypted = encryptMessage(
        inputValue,
        partnerPublicKey,
        myKeyPair.privateKey
      );

      console.log("✅ Encrypted result length:", encrypted.length);

      const msg: Message = {
        id,
        senderId: user?.id || "",
        senderName: name,
        recipientId: partnerId,
        encryptedContent: encrypted,
        senderPublicKey: myKeyPair.publicKey,
        content: inputValue,
        timestamp: new Date(),
        status: "sending",
        isEncrypted: true,
      };

      console.log("📤 Sending message:", {
        id: msg.id,
        senderId: msg.senderId,
        recipientId: msg.recipientId,
        senderPublicKey: msg.senderPublicKey.substring(0, 20),
        encryptedLength: msg.encryptedContent.length,
      });
      
      setMessages((prev) => [...prev, msg]);

      socket.emit("send_message", msg);

      setInputValue("");
    } catch (error) {
      console.error("❌ Send message error:", error);
      toast.error("Failed to send message");
    }
  };


  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sending":
        return <Loader2 className="w-3 h-3 animate-spin" />;
      case "sent":
        return <Check className="w-3 h-3" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <Card className="mb-6 p-4 sm:p-6  border-0">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-green-600" />
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {partnerName}
                </h1>
              </div>
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="w-4 h-4 text-green-600" />
                End-to-End Encrypted
              </p>
              {connectionStatus === "disconnected" && (
                <p className="text-xs text-red-500 mt-2">
                  Disconnected — reconnecting...
                </p>
              )}
              {!partnerPublicKey && (
                <p className="text-xs text-yellow-600 mt-2 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Waiting for partner key...
                </p>
              )}
            </div>
          </Card>

          {/* Messages */}
          <Card className="h-[500px] sm:h-[600px] flex flex-col bg-background border">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-12 h-12 mx-auto mb-2 text-green-600 opacity-50" />
                    <p className="text-muted-foreground mb-2">
                      No messages yet. Start your conversation 💬
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((m) => {
                  const isMine = m.senderId === user?.id;
                  const timeStr = format(new Date(m.timestamp), "HH:mm");
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        isMine ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          isMine
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none"
                            : "bg-muted text-foreground rounded-bl-none"
                        }`}
                      >
                        <p className="text-xs font-semibold mb-1 opacity-75">
                          {m.senderName}
                        </p>
                        <p className="text-sm break-words">{m.content}</p>
                        <div
                          className={`text-xs mt-1 flex items-center justify-between gap-2 ${
                            isMine ? "text-blue-100" : "text-muted-foreground"
                          }`}
                        >
                          <span>{timeStr}</span>
                          {isMine && getStatusIcon(m.status)}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-muted-foreground text-sm"
                  >
                    <span>{partnerName} is typing</span>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      ●●●
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4 sm:p-6 bg-background">
              <form
                onSubmit={handleSendMessage}
                className="flex gap-2 sm:gap-3"
              >
                <Input
                  type="text"
                  placeholder={
                    partnerPublicKey
                      ? "Type a message..."
                      : "Waiting for encryption setup..."
                  }
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    handleTyping();
                  }}
                  disabled={isLoading || !socket || !partnerPublicKey}
                  className="flex-1 rounded-full"
                />
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    !socket ||
                    !partnerPublicKey ||
                    !inputValue.trim()
                  }
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-4 sm:px-6"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </form>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;
