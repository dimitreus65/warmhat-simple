import React from "react";

interface AuthFormLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  showDivider?: boolean;
}

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({
  title,
  description,
  children,
  showDivider = false,
}) => {
  return (
    <div className="w-full">
      {/* Заголовок */}
      <h2 className="text-xl font-bold text-center mb-2">{title}</h2>

      {/* Описание (если нужно) */}
      {description && (
        <p className="text-sm text-gray-600 text-center mb-4">{description}</p>
      )}

      {/* Основное содержимое формы */}
      <div className="space-y-4">{children}</div>

      {/* Разделитель "или" */}
      {showDivider && (
        <div className="my-4 flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-xs text-gray-500">или</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
      )}
    </div>
  );
};

export default AuthFormLayout;
