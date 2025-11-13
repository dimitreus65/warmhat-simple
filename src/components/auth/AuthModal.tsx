import React from "react";
import { LoginForm } from "./forms/LoginForm";
import { RegisterForm } from "./forms/RegisterForm";
import { ForgotPasswordForm } from "./forms/ForgotPasswordForm";
import { ButtonSimple as Button } from "@/components/ui/ButtonSimple";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = React.useState<"login" | "register" | "forgot-password">("login");

  if (!isOpen) return null;

  const handleSwitchMode = (newMode: "login" | "register" | "forgot-password") => {
    setMode(newMode);
  };

  const handleSuccess = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Закрыть"
        >
          ✕
        </button>

        {/* Содержимое форм */}
        {mode === "login" && (
          <LoginForm onSuccess={handleSuccess} onSwitchMode={handleSwitchMode} />
        )}
        {mode === "register" && (
          <RegisterForm onSuccess={handleSuccess} onSwitchMode={handleSwitchMode} />
        )}
        {mode === "forgot-password" && (
          <ForgotPasswordForm onSuccess={handleSuccess} onSwitchMode={handleSwitchMode} />
        )}

        {/* Подвал (универсальный, можно отключить) */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            Закрыть окно
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
