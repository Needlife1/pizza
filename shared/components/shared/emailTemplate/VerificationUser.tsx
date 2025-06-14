import * as React from 'react';

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <p>
      Код підтвердження <h1>{code}</h1>
    </p>
{/*вставить адрес хостингу */}
    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}> Підтвердити реєстрацію</a>
    </p>
  </div>
);
