import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from 'react';
import axiosClient from "./axiosClient";

export const useAuth = () => {
  const [username, setUsername] = useState('');
  const [LastName, setLastName ] = useState('');
  const [FirtName, setFirtName ] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const [userId, setUserId] =useState('');
  const [account, setAccount] =useState([]);
  const [selectedAccount, setSelectedAccount] = useState({});


  const capitalizeEachWord = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosClient.get(`/Users`);
        const fetchedAccount = response.data;
        setAccount(fetchedAccount);
  
        if (token) {
          const decodedToken = jwtDecode(token);
          setUsername(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
          setIsAdmin(decodedToken && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin');
  
          // Gọi setSelectedAccount và đợi cho đến khi nó hoàn thành trước khi gọi setUserId
          const selectedAcc = fetchedAccount.find(a => a.userName === decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
          setSelectedAccount(selectedAcc);
  
          // Kiểm tra xem selectedAcc có tồn tại trước khi gọi setUserId
          if (selectedAcc) {
            setUserId(selectedAcc.id);
            setLastName(capitalizeEachWord(selectedAcc.lastName));
            setFirtName(capitalizeEachWord(selectedAcc.firtName));
            //console.log(selectedAcc);
            // Update state with additional data
            
          }
  
          setIsLoggedIn(true);
        } else {
          setUsername('');
          setLastName('');
          setFirtName('');
          setUserId('');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
  
    fetchData();
  }, []);

  return { isLoggedIn, username, isAdmin, userId,LastName,FirtName};
};
// export const setLoggedInUser = (token) => {
 
//   const isLoggedIn = 
//   username = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
// };