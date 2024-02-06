import { useEffect, useState } from "react";
import { useAuth } from "../Component/auth";
import axiosClient from "../Component/axiosClient";
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from "react-router-dom";




const Star_Rating = ({ productId, sku, idInvoiDetail, isRating }) => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [rating, setRating] = useState({});
    const [israting, setisRating] = useState([]);
    const [conment, setComment] = useState([]);
    const [countStar, setCountStar] = useState(0);
    const [submiting, setSubmiting] = useState(false);
    const {userId}=useAuth();
    const [invoiceDetailId, setinvoiceDetailId] = useState({});
    const navigate = useNavigate();
  

    
    useEffect(() => {
        axiosClient.get('/InvoiceDetails').then((res)=> 
        setinvoiceDetailId(res.data.find((a)=>a.invoiceId === idInvoiDetail && 
        sku ? a.productId === productId : a.comboId === productId)))
    },[]);
    const handleRatingChange = (rating) =>{
        setSelectedRating(rating);
    };


    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitRating = ()=>{
        if(selectedRating == 0)
        {
            alert('Please select a rating!')
            return;
        }
        const ratingData ={
            userId : userId,
            productId : sku ? productId: null,
            comboId: !sku ? productId : null,
            RatingTime: new Date(),
            invoiceDetailId : invoiceDetailId.id,
            invoiceId: idInvoiDetail,
            Score: selectedRating,
            comment : conment,
            Status : true,
        }
        console.log('ratingdata', ratingData)

        const token = localStorage.getItem('token');
       axiosClient.post(`/Ratings`, ratingData,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Các headers khác nếu cần thiết
        },})
        .then((res)=>{ alert("Đánh giá thành công!");window.location.reload();})
        .catch((err) => alert("Đánh giá thất bại!"));
        

        
    };  

    const renderStar = () =>{
        const isRaTed = countStar !== 0;
    
        return (
            <div className='star-container'>
            {[1,2,3,4,5].map((item) => (
                <i key={item}
                className="fa fa-star"
                icon={isRaTed ? solidStar : regularStar}
                onClick={()=> handleRatingChange(item)}
                style={{
                    cursor:'pointer',
                    fontSize: '30px',
                    color: isRaTed ?(item <= countStar ?'#EDBB0E': '#837979') : (item <= selectedRating ? '#EDBB0E': '#837979'),
                    }}
                />
        ))}
            </div>
             );
    };
    return (<>
        <div className="star-rating-container" style={{ display: 'flex', width: '95%', boxShadow: '0 0 5px rgba(0, 0, 0 , 0.2)', padding: '25px' }}>
          <div>
            <h4 style={{ marginBottom: '10px' }}>Đánh giá:</h4>
            {renderStar()}
          </div>
      
          <div style={{ display: 'block', flex: '2', marginLeft: '15%' }}>
            <h4 style={{ marginBottom: '20px' }}>Comment:</h4>
            <textarea style={{ display: 'block', fontSize: '16px', height: '90px', width: '250px' }} value={conment} onChange={handleCommentChange}></textarea>
            {/* <a href="/Shop/account/orderManagement"></a> */}
            <button className="site-btn" onClick={handleSubmitRating} style={{ marginLeft: '65%' }}>Gửi</button>
          </div>
        </div>
    </>
    );
};
 
export default Star_Rating;