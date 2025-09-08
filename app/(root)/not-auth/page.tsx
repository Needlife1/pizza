import { InfoBlock } from "@/shared/components/shared";


export default function NotAuthPage() { 
    return (
      <div className="mx-auto max-w-[900px] mt-12 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-8">
        <InfoBlock
          title="Доступ заборонено"
          text="Цю сторінку можуть переглядати лише авторизовані користувачі."
          imageUrl="/assets/images/lock.png"
        />
      </div>
    );
}