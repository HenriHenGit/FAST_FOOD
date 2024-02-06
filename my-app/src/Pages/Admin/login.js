import axiosClient from "../Component/axiosClient";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
const Login = () => {
    const [files, setFiles] = useState([]);
    const handleFileChange = (e) =>{
        setFiles(e.target.files);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const Images = new FormData();

        for (let i = 0; i < files.length; i++) {
            Images.append(`file${i + 1}`, files[i]);
        }

        try {
            const response = await axiosClient.post(`/Products/Files`, Images, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response:', response);
            // Xử lý dữ liệu khác nếu cần
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Form className="col-md-6" encType="multipart/form-data" onSubmit={handleSubmit} >
                <Form.Group className="mb-3">
                    <Form.Label>Ảnh đại diện:</Form.Label>
                    <Form.Control type="file" name="Images" multiple accept="image/*" onChange={handleFileChange} />
                </Form.Group>
                <Button type="submit" variant="success" >
                    Cập nhật
                </Button>
            </Form>
        </>
    );
}
 
export default Login;