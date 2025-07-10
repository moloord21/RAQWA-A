import React, { useState } from 'react';
import { useQRCodes } from '../hooks/useQRCodes';
import { QRCode, QRAnalytics } from '../types';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save,
  X,
  QrCode,
  BarChart3,
  ExternalLink,
  Copy,
  Download
} from 'lucide-react';
import QRCodeLib from 'qrcode';

export const QRCodeManager: React.FC = () => {
  const { qrCodes, addQRCode, updateQRCode, deleteQRCode, getQRAnalytics, generateShortCode } = useQRCodes();
  
  const [editingQR, setEditingQR] = useState<QRCode | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<QRAnalytics[]>([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const [qrForm, setQRForm] = useState({
    name: '',
    shortCode: '',
    destinationUrl: '',
    isActive: true
  });

  const handleAddQR = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addQRCode(qrForm);
      setQRForm({ name: '', shortCode: '', destinationUrl: '', isActive: true });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add QR code:', error);
    }
  };

  const handleUpdateQR = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQR) return;
    
    try {
      await updateQRCode(editingQR.id, {
        name: editingQR.name,
        shortCode: editingQR.shortCode,
        destinationUrl: editingQR.destinationUrl,
        isActive: editingQR.isActive
      });
      setEditingQR(null);
    } catch (error) {
      console.error('Failed to update QR code:', error);
    }
  };

  const handleDeleteQR = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this QR code? This will also delete all associated analytics data.')) {
      try {
        await deleteQRCode(id);
      } catch (error) {
        console.error('Failed to delete QR code:', error);
      }
    }
  };

  const handleToggleActive = async (qr: QRCode) => {
    try {
      await updateQRCode(qr.id, { isActive: !qr.isActive });
    } catch (error) {
      console.error('Failed to toggle QR code status:', error);
    }
  };

  const handleShowAnalytics = async (qrCodeId: string) => {
    setLoadingAnalytics(true);
    try {
      const data = await getQRAnalytics(qrCodeId);
      setAnalytics(data);
      setShowAnalytics(qrCodeId);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const generateQRCodeImage = async (qr: QRCode): Promise<string> => {
    const qrUrl = `${window.location.origin}/qr/${qr.shortCode}`;
    try {
      return await QRCodeLib.toDataURL(qrUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      return '';
    }
  };

  const downloadQRCode = async (qr: QRCode) => {
    try {
      const dataUrl = await generateQRCodeImage(qr);
      const link = document.createElement('a');
      link.download = `qr-${qr.shortCode}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to download QR code:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getAnalyticsSummary = (qrId: string) => {
    const qrAnalytics = analytics.filter(a => a.qrCodeId === qrId);
    const totalScans = qrAnalytics.length;
    const countries = [...new Set(qrAnalytics.map(a => a.country).filter(Boolean))];
    const devices = [...new Set(qrAnalytics.map(a => a.deviceType).filter(Boolean))];
    
    return { totalScans, countries: countries.length, devices: devices.length };
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-pink-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <QrCode className="w-5 h-5 mr-2" />
          QR Code Management
        </h2>
        <button
          onClick={() => {
            setQRForm({ ...qrForm, shortCode: generateShortCode() });
            setShowAddForm(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          <Plus size={16} />
          <span>Create QR Code</span>
        </button>
      </div>

      {/* Add QR Form */}
      {showAddForm && (
        <div className="bg-pink-50 rounded-xl p-6 mb-6 border border-pink-200">
          <form onSubmit={handleAddQR} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  QR Code Name
                </label>
                <input
                  type="text"
                  value={qrForm.name}
                  onChange={(e) => setQRForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="e.g., Website Link"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={qrForm.shortCode}
                    onChange={(e) => setQRForm(prev => ({ ...prev, shortCode: e.target.value.toLowerCase() }))}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="abc123"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setQRForm(prev => ({ ...prev, shortCode: generateShortCode() }))}
                    className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination URL
              </label>
              <input
                type="url"
                value={qrForm.destinationUrl}
                onChange={(e) => setQRForm(prev => ({ ...prev, destinationUrl: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="https://example.com"
                required
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                <Save size={16} />
                <span>Create QR Code</span>
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* QR Codes List */}
      <div className="space-y-4">
        {qrCodes.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No QR codes created yet.</p>
        ) : (
          qrCodes.map((qr) => (
            <div
              key={qr.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
            >
              {editingQR?.id === qr.id ? (
                <form onSubmit={handleUpdateQR} className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={editingQR.name}
                    onChange={(e) => setEditingQR(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    value={editingQR.shortCode}
                    onChange={(e) => setEditingQR(prev => prev ? { ...prev, shortCode: e.target.value.toLowerCase() } : null)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="url"
                    value={editingQR.destinationUrl}
                    onChange={(e) => setEditingQR(prev => prev ? { ...prev, destinationUrl: e.target.value } : null)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                  <div className="flex items-center space-x-2 md:col-span-3">
                    <button
                      type="submit"
                      className="flex items-center space-x-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Save size={14} />
                      <span>Save</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingQR(null)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{qr.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>/qr/{qr.shortCode}</span>
                        <button
                          onClick={() => copyToClipboard(`${window.location.origin}/qr/${qr.shortCode}`)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          title="Copy QR URL"
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{qr.destinationUrl}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      qr.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {qr.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => downloadQRCode(qr)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Download QR Code"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => handleShowAnalytics(qr.id)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="View Analytics"
                    >
                      <BarChart3 size={16} />
                    </button>
                    <button
                      onClick={() => window.open(qr.destinationUrl, '_blank')}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Visit URL"
                    >
                      <ExternalLink size={16} />
                    </button>
                    <button
                      onClick={() => handleToggleActive(qr)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title={qr.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {qr.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => setEditingQR(qr)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteQR(qr.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  QR Code Analytics
                </h3>
                <button
                  onClick={() => setShowAnalytics(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {loadingAnalytics ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Analytics Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Total Scans</h4>
                      <p className="text-2xl font-bold text-pink-600">{analytics.length}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Countries</h4>
                      <p className="text-2xl font-bold text-blue-600">
                        {[...new Set(analytics.map(a => a.country).filter(Boolean))].length}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Device Types</h4>
                      <p className="text-2xl font-bold text-green-600">
                        {[...new Set(analytics.map(a => a.deviceType).filter(Boolean))].length}
                      </p>
                    </div>
                  </div>

                  {/* Recent Scans */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Recent Scans</h4>
                    {analytics.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No scans recorded yet.</p>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {analytics.slice(0, 50).map((scan) => (
                          <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-800">
                                    {scan.city && scan.country ? `${scan.city}, ${scan.country}` : scan.country || 'Unknown Location'}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {scan.deviceType} • {scan.operatingSystem}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">
                                {new Date(scan.scannedAt).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(scan.scannedAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};