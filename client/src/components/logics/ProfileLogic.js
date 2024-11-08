import { useEffect, useState } from 'react';

const useProfileLogic = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/profile`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Ошибка получения профиля');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
      }
    };

    fetchProfile();
  }, []);

  return { profile };
};

export default useProfileLogic;