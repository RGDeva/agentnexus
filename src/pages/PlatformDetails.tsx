import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ThumbsUp, MessageSquare, ExternalLink } from 'lucide-react';
import { useAccount } from 'wagmi';
import { platforms } from '../data/platforms';

export function PlatformDetails() {
  const { id } = useParams();
  const { address, isConnected } = useAccount();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const platform = platforms.find(p => p.id === id);

  if (!platform) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white">Platform not found</h2>
        <Link to="/" className="text-cyan-400 hover:text-cyan-300 mt-4 inline-block">
          Return to home
        </Link>
      </div>
    );
  }

  const handleVote = async () => {
    if (!isConnected) {
      // Show connect wallet modal
      return;
    }
    // TODO: Implement voting logic with smart contract
  };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;
    
    // TODO: Implement review submission
    console.log({ rating, comment, address });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        to="/"
        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Directory
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-xl border border-slate-700/50"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{platform.name}</h1>
            <p className="text-slate-400">{platform.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleVote}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{platform.votes || 0}</span>
            </button>
            {platform.links.website && (
              <a
                href={platform.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Platform
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Reviews</h2>
            <div className="space-y-4">
              {platform.reviews?.map(review => (
                <div key={review.id} className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">
                        {review.address.slice(0, 6)}...{review.address.slice(-4)}
                      </span>
                      <div className="flex items-center text-yellow-400">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">
                      {new Date(review.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Write a Review</h2>
            {isConnected ? (
              <form onSubmit={handleReview} className="space-y-4">
                <div>
                  <label className="block text-slate-400 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        className={`p-1 ${i < rating ? 'text-yellow-400' : 'text-slate-600'}`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-2">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    rows={4}
                    placeholder="Share your experience..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                >
                  Submit Review
                </button>
              </form>
            ) : (
              <div className="text-center py-8 bg-slate-700/30 rounded-lg">
                <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400">Connect your wallet to leave a review</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}