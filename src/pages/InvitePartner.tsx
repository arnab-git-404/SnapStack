import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface PartnerStatus {
  hasPartner: boolean;
  status: 'no_partner' | 'pending' | 'active';
  partner?: {
    id: string;
    name: string;
    email: string;
  };
  inviteExpires?: string;
}

const InvitePartner = () => {

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus | null>(null);
  const [formData, setFormData] = useState({
    partnerName: '',
    partnerEmail: ''
  });

  useEffect(() => {
    checkPartnerStatus();
  }, []);

  const checkPartnerStatus = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/partner/status`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setPartnerStatus(response.data.data);

        if (response.data.data.status === 'active') {
          toast.success('You already have an active partner!');
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error checking partner status:', error);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.partnerName || !formData.partnerEmail) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/partner/invite`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success('Invitation sent successfully! 🎉');
        await checkPartnerStatus();
        setFormData({ partnerName: '', partnerEmail: '' });
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send invitation';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelInvitation = async () => {
    if (!confirm('Are you sure you want to cancel this invitation?')) {
      return;
    }

    try {
      const response = await axios.delete(
        `${SERVER_URL}/api/partner/invitation`,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success('Invitation cancelled');
        await checkPartnerStatus();
      }
    } catch (error: any) {
      toast.error('Failed to cancel invitation');
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking partner status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💑</div>
          <h1 className="text-4xl font-bold mb-2">
            Invite Your Partner
          </h1>
          <p className="text-gray-500 text-lg">
            Share your memories together on SnapStack
          </p>
        </div>

        {/* Pending Invitation Card */}
        {partnerStatus?.status === 'pending' && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  ⏳ Invitation Pending
                </h3>
                <p className="text-yellow-800 mb-4">
                  You've sent an invitation. Waiting for your partner to accept.
                </p>
                <div className="space-y-2 text-sm">
                  {partnerStatus.inviteExpires && (
                    <p className="text-yellow-700">
                      <strong>Expires:</strong>{' '}
                      {new Date(partnerStatus.inviteExpires).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleCancelInvitation}
                className="ml-4 text-red-600 hover:text-red-700 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Invitation Form */}
        {partnerStatus?.status !== 'pending' && (
          <div className=" rounded-2xl shadow-xl p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Partner Name */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Partner's Name
                </label>
                <input
                  type="text"
                  name="partnerName"
                  value={formData.partnerName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Partner Email */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Partner's Email
                </label>
                <input
                  type="email"
                  name="partnerEmail"
                  value={formData.partnerEmail}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">💌</span>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      What happens next?
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>✉️ Your partner will receive an invitation email</li>
                      <li>📝 They'll create their account using the link</li>
                      <li>🎉 Once accepted, you'll both be connected!</li>
                      <li>⏰ Invitation expires in 7 days</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Invitation...
                  </span>
                ) : (
                  'Send Invitation 💌'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Skip Button */}
        <div className="text-center">
          <button
            onClick={handleSkip}
            className="text-gray-600 hover:text-gray-200 font-medium"
          >
            Skip for now →
          </button>
          <p className="text-sm text-gray-500 mt-2">
            You can invite your partner later from settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvitePartner;