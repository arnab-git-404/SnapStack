import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Lightbulb } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PuzzlePage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const imageUrl = searchParams.get("image");
  const [puzzleKey, setPuzzleKey] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [showHint, setShowHint] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [hintsRemaining, setHintsRemaining] = useState(() => {
    const stored = localStorage.getItem(`puzzle-hints-${imageUrl}`);
    return stored ? parseInt(stored) : 2;
  });

  const difficultySettings = {
    easy: { rows: 3, columns: 3 },
    medium: { rows: 4, columns: 4 },
    hard: { rows: 5, columns: 5 },
  };

  // Countdown timer effect
  useEffect(() => {
    if (showHint && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showHint && countdown === 0) {
      setShowHint(false);
      setCountdown(5);
    }
  }, [showHint, countdown]);

  // Save hints remaining to localStorage
  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem(
        `puzzle-hints-${imageUrl}`,
        hintsRemaining.toString()
      );
    }
  }, [hintsRemaining, imageUrl]);

  const handleReset = () => {
    setPuzzleKey((prev) => prev + 1);
    // Reset hints when puzzle is reset
    setHintsRemaining(2);
    localStorage.setItem(`puzzle-hints-${imageUrl}`, "2");
    toast.success("Puzzle reset! Hints restored to 2.");
  };

  const handleHint = () => {
    if (hintsRemaining <= 0) {
      toast.error("No hints remaining! Reset the puzzle to get more hints.");
      return;
    }

    if (showHint) {
      toast("Hint already showing!", { icon: "⏳" });
      return;
    }

    setShowHint(true);
    setCountdown(5);
    setHintsRemaining((prev) => prev - 1);
    toast.success(`Hint activated! ${hintsRemaining - 1} hints remaining.`, {
      icon: "💡",
      duration: 2000,
    });
  };

  const handleSolved = () => {
    toast.success("Congratulations! You solved the puzzle!", {
      duration: 5000,
      icon: "🏆",
    });

    // Clear hints from localStorage when solved
    if (imageUrl) {
      localStorage.removeItem(`puzzle-hints-${imageUrl}`);
    }
  };

  const handleDifficultyChange = (value: "easy" | "medium" | "hard") => {
    setDifficulty(value);
    setPuzzleKey((prev) => prev + 1);
    // Reset hints when difficulty changes
    setHintsRemaining(2);
    localStorage.setItem(`puzzle-hints-${imageUrl}`, "2");
    toast.success(`Difficulty set to ${value}! Hints restored to 2.`);
  };

  if (!imageUrl) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-muted-foreground">
          No image selected for the puzzle.
        </p>

        <Select onValueChange={(value) => navigate(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select an Image from" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="/together">Together</SelectItem>
            <SelectItem value="/arnab">Arnab</SelectItem>
            <SelectItem value="/deblina">Deblina</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }

  const { rows, columns } = difficultySettings[difficulty];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24 mt-16 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4">
          Photo Puzzle
        </h1>
        <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
          Piece together your favorite memories.
        </p>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              onClick={handleHint}
              variant="outline"
              size="sm"
              className="gap-2 relative"
              disabled={hintsRemaining <= 0}
            >
              <Lightbulb className="w-4 h-4" />
              Hint ({hintsRemaining})
            </Button>
          </div>

          <Select value={difficulty} onValueChange={handleDifficultyChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy (3×3)</SelectItem>
              <SelectItem value="medium">Medium (4×4)</SelectItem>
              <SelectItem value="hard">Hard (5×5)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Puzzle Container */}
        <div className="flex justify-center mb-8 relative">
          <div
            className="w-full max-w-[400px] aspect-square"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
            }}
          >
            {/* Hint Overlay */}
            {showHint && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-100 dark:bg-black/80 rounded-lg">
                <div className="relative w-full h-full flex items-center justify-center p-8">
                  <img
                    src={imageUrl}
                    alt="Hint"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                  <div className="absolute top-4 right-4 bg-white text-black font-bold text-2xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg animate-pulse">
                    {countdown}
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2  px-4 py-2 rounded-full text-sm font-semibold">
                    Memorize quickly! 👀
                  </div>
                </div>
              </div>
            )}

            <JigsawPuzzle
              key={puzzleKey}
              imageSrc={imageUrl}
              rows={rows}
              columns={columns}
              onSolved={handleSolved}
            />
          </div>
        </div>

        <Button asChild variant="outline" className="mt-4 sm:mt-8">
          <Link to={-1 as any}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Gallery
          </Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default PuzzlePage;
