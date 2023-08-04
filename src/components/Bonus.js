import { useEffect, useState } from 'react';
import './Bonus.css';
export const Bonus = () => {
    const [accessToken, setAccessToken] = useState('');
    const [bonuses, setBonuses] = useState({
        data: {
            currentQuantity: 200,
            forBurningQuantity: 30
        }
    });
    useEffect(() => {
        // Функция для получения AccessToken
        const getAccessToken = async () => {
            try {
                const response = await fetch('http://84.201.188.117:5021/', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer 891cf53c-01fc-4d74-a14c-592668b7a03c',
                    },
                });
                const data = await response.json();
                setAccessToken(data.access_token);
            } catch (error) {
                console.error('Ошибка при получении AccessToken:', error);
            }
        };

        // Функция для получения бонусов
        const getBonuses = async () => {
            try {
                const response = await fetch('http://84.201.188.117:5003', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                setBonuses(data);
            } catch (error) {
                console.error('Ошибка при получении бонусов:', error);
            }
        };

        getAccessToken();
        getBonuses();
    }, [accessToken]);

    const isLoading = bonuses.data.currentQuantity === 0;
    return <div>
        <div className='header'>

            <div className='custom-size text'>ЛОГОТИП</div>
            <div className='logo-info'>
                <img src='images/Vector.png' alt='Лого информация' />
            </div>
        </div>
        <div className='bg-red custom-size'></div>


        {!isLoading && (
            <div className='popup'>
                <div className='text-bold'>{bonuses.data.currentQuantity}  бонусов</div>
                <div className="burning-bonus">{bonuses.data.forBurningQuantity} сгорит
                    <img className='logo' src='images/Fire.svg' alt="logo" />
                    <span>250</span> бонусов
                    <div class="circle-container">
                        <div class="circle"></div>
                        <div class="arrow"></div>
                    </div>

                </div>
                <div>
                </div>
            </div>
        )}
        {isLoading && <div>Загрузка...</div>}
    </div>
}