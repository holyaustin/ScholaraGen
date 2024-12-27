import React, { useState } from 'react';
import { User } from 'lucide-react';
import { UserSettings } from '../types';

interface OnboardingProps {
  onComplete: (settings: UserSettings) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [settings, setSettings] = useState<UserSettings>({
    name: '',
    avatar: '',
  });
  const avatarImg= 'https://img.freepik.com/free-photo/pens-glasses-books_23-2147863650.jpg?t=st=1735120153~exp=1735123753~hmac=b6390865f6c2528bed48010db8fab6215da58603776ed3fcfd858f1853597131&w=1060';

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && settings.name) {
      setStep(2);
    } else if (step === 2) {
      onComplete(settings);
    }
  };

  return (
    <div className="min-h-screen bg-gray-600 flex flex-col items-center justify-center p-4">
      <img
        src={avatarImg}
        alt="image"
        className="flex w-36 h-36 rounded-full"
      />
      <div className="text-white mr-4 pb-5 mt-3 justify-center text-center w-full max-w-md text-4xl font-extrabold">
    
        <h1>Academic Paper Generator</h1>
      </div>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {step === 1 ? "What's your name?" : "Choose your avatar"}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
              autoFocus
            />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-32 h-32">
                {settings.avatar ? (
                  <img
                    src={settings.avatar}
                    alt="Selected avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-2 right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <span className="text-white text-xl">+</span>
                </label>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 bg-gray-600 font-bold text-white rounded-lg hover:bg-indigo-700 transition-colors"
            disabled={step === 1 && !settings.name}
          >
            {step === 1 ? 'Continue' : 'Start Chatting'}
          </button>
        </form>
      </div>
    </div>
  );
};