import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isEmail } from '@/lib/validation';
import { useSnackbar } from "@/hooks/use-snackbar";
import { supabase } from "@/lib/supabase-client";
import { ButtonSimple as Button } from "@/components/ui/ButtonSimple";
import FormField from "@/components/FormField";
import Input  from "@/components/ui/Input";
import AuthFormLayout from "../AuthFormLayout";

interface ForgotPasswordFormProps {
  onSuccess: () => void;
  onSwitchMode: (mode: "login") => void;
}

export function ForgotPasswordForm({ onSuccess, onSwitchMode }: ForgotPasswordFormProps) {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");

  const handlePasswordResetRequest = async () => {
    if (!email.trim()) {
      showSnackbar(t("authModal.forgotPassword.enterEmail"), "info");
      return;
    }
    if (!isEmail(email)) {
      showSnackbar(t('authModal.validation.emailInvalid'), 'info');
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/update-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) throw error;
      showSnackbar(t("authModal.forgotPassword.resetLinkSent"), "info");
      onSuccess();
    } catch (err) {
      showSnackbar(t("authModal.forgotPassword.resetError"), "error");
      console.error("Password reset error:", err);
    }
  };

  return (
      <AuthFormLayout
    title={t("authModal.forgotPassword.title")}
    description={t("authModal.forgotPassword.description")}
  >

      <FormField label={t("authModal.emailLabel")}>
        <Input
          name="resetEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("authModal.emailPlaceholder")}
          className="w-full border p-2 rounded border-gray-300 focus:border-shop-blue-dark focus:ring-shop-blue-dark"
        />
      </FormField>

      <Button
        onClick={handlePasswordResetRequest}
        className="mt-4 w-full bg-shop-blue-dark text-white py-2 rounded hover:bg-shop-blue-dark/90"
      >
        {t("authModal.forgotPassword.sendResetLink")}
      </Button>

      <div className="mt-4 text-sm text-center">
        <Button
          className="text-shop-blue-dark underline"
          onClick={() => onSwitchMode("login")}
        >
          {t("authModal.forgotPassword.backToLogin")}
        </Button>
      </div>
      </AuthFormLayout>
  );
}
