import { faCheck, faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../Component/axiosClient";
import { forEach } from "lodash";



const ProductAdAdd = () => {
    const navigate = useNavigate();

     const [Promotions, setPromotion] = useState([]);
     const [PromotionId, setPromotionId] = useState(null);
    const [SKU, setSku] = useState('');
    const [Name, setName] = useState('');
    const [Description,setDescription] = useState('');
    const [Price, setPrice] = useState(0);
    const [ProductTypeId, setProductTypeId] = useState(0);
    const [Status, setStatus] = useState(true);
    const [productTypes, setProductType] =useState([]);
    const [files, setFiles] = useState([]);
    // const [images,setImages] = useState([]);
    const [product,setProduct] = useState([]);
    // const [image, setimage] = useState({
    //     ImageId : '',
    //     Img : ''
    // });
    
    useEffect(() =>{
        axiosClient.get(`/ProductTypes/ProductType`)
             .then(res =>setProductType(res.data));
    },[]);
    useEffect(() =>{
        axiosClient.get(`/Promotions`)


             .then(res =>setPromotion(res.data));
    },[]);

    const handleChange = (e) =>{
      let name = e.target.name;
      let value = e.target.value;
      setProduct(prev =>({...prev, [name]: value}));
  }
   
    
      const handleChangeSelectProductTypeId = (event) => {
        setProductTypeId(event.target.value);
      };
      const handleChangeSelectPromotionId = (event) => {
        setPromotionId(event.target.value);
      };

      const handleFileChange = (e) => {
        const image = e.target.files;
        setFiles(image);
        if (image.length > 0) {
            console.log("File size:", image[0].size);
            setFiles(image);
        }
        // const imageArray = Array.from(image);
        // setImages(imageArray);
       
    
      }
     
    const handleCheck = (e) => {
        let name = e.target.name;
        let value = e.target.checked;
        setStatus(value);
    }
  
    const handleSubmit =  (e) => {
      e.preventDefault();
     
      const token = localStorage.getItem('token');
      const producData = new FormData();
      producData.append("PromotionId", PromotionId || '') ;
      producData.append("SKU", SKU);
      producData.append("Name", Name);
      producData.append("Description", Description);
      producData.append("Price", Price);
      producData.append("ProductTypeId", ProductTypeId);
      producData.append("ImageFile", files[0]); // Assuming only one file is selected
      producData.append("Status", Status);
 
      axiosClient.post(`/Products`, producData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(() => navigate('/admin/product'))
    .catch(error => console.error("Lỗi khi thêm sản phẩm: ", error));
    producData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
   
      }
      console.log(('file',files));
     
    return ( 
    <>
            <div className="form-container align-items-center mt-3">
            <h3 className="ml-3">Thêm sản phẩm</h3>
            <Form className="col-md-6" encType="multipart/form-data">
                <Form.Group className="mb-3" >
                    <Form.Label>Sự lựa chọn:</Form.Label>
                    <Form.Select value={PromotionId} onChange={handleChangeSelectPromotionId}>
                        <option  value={null}>Không có khuyến mãi</option>
                        {Promotions.map((type) => (
                            <option key={type.id} value={type.id}>{type.promotionName}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tên sản phẩm:</Form.Label>
                    <Form.Control type="text" name="Name" value={Name} onChange={(e) => {setName(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Giá</Form.Label>
                    <Form.Control type="number" name="Price" value={Price} onChange={(e) => {setPrice(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mã sản phẩm:</Form.Label>
                    <Form.Control type="text" name="SKU" value={SKU} onChange={(e) =>{setSku(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Sự lựa chọn:</Form.Label>
                    <Form.Select value={ProductTypeId} onChange={handleChangeSelectProductTypeId}>
                    <option  value= {1}>Lựa chọn loại</option>
                        {productTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mô tả:</Form.Label>
                    <Form.Control as="textarea" name="Description" value={Description} onChange={(e)=>{setDescription(e.target.value)}} />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Ảnh đại diện:</Form.Label>
                    <Form.Control type="file" name="Images" multiple accept="image/*" onChange={handleFileChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="switch" label="Còn hoạt động" name="Status" onChange={handleCheck} checked={Status} />
                </Form.Group>
                <Button type="submit" variant="success" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faCheck} /> Cập nhật
                </Button>
            </Form>
        </div>

        </>
     );
};
 
export default ProductAdAdd;