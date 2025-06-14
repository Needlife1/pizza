import { InfoBlock } from "@/shared/components/shared";


export default function NotAuthPage() { 
    return (
        <div className="mx-auto max-w-[900px] mt-20">
            <InfoBlock
                title="Доступ заборонено"
                text="Цю сторінку можуть переглядати лише авторизовані користувачі."
                imageUrl="/assets/images/lock.png"
            
            />
        </div>
    )
}