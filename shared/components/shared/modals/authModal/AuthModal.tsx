import { Button, Dialog, DialogContent } from '@/shared/components/ui';
import { signIn } from 'next-auth/react';
import React from 'react';
import { LoginForm } from './forms/LoginForm';
import { RegisterForm } from './forms/RegisterForm';

interface Props {
  open?: boolean;
  onClose?: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {/* FoRm */}
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="github"
            />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="Google"
            />
            Google
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={onSwitchType}
          type="button"
          className="h-12"
        >
          {type === 'login' ? 'Реєстрація' : 'Увійти'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
