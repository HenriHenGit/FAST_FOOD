use APIServerFood
--ProductType
INSERT ProductTypes(Name,Status) Values(N'Gà ráng/quay',1)
INSERT ProductTypes(Name,Status) Values(N'Cơm',1)
INSERT ProductTypes(Name,Status) Values(N'Burger',1)
INSERT ProductTypes(Name,Status) Values(N'Thức ăn nhẹ',1)
INSERT ProductTypes(Name,Status) Values(N'Nước uống',1)
INSERT ProductTypes(Name,Status) Values(N'ComBo',1)


--Image
INSERT Images(Id,ImageId,Img) Values(N'SP2',2,N'2.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP3',3,N'3.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP4',4,N'4.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP1',1,N'1.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP5',5,N'5.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP6',6,N'6.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP7',7,N'7.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP8',8,N'8.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP9',9,N'9.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP10',10,N'10.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP11',11,N'11.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP12',12,N'12.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP13',13,N'13.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP14',14,N'14.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP15',15,N'15.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP16',16,N'16.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP17',17,N'17.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP18',18,N'18.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP19',19,N'19.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP20',20,N'20.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP21',21,N'21.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP22',22,N'22.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP23',23,N'23.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP24',24,N'24.jpg')
----bat dau tu 28 se co nuoc uong, combo
INSERT Images(Id,ImageId,Img) Values(N'SP25',25,N'25.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP26',26,N'26.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP27',27,N'27.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP28',28,N'28.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP29',29,N'29.jpg')
INSERT Images(Id,ImageId,Img) Values(N'SP30',30,N'30.jpg')


-- COMBO
INSERT Images(Id,ImageId,Img) Values(N'CB1',31,N'31.jpg')
INSERT Images(Id,ImageId,Img) Values(N'CB2',32,N'32.jpg')
INSERT Images(Id,ImageId,Img) Values(N'CB3',33,N'33.jpg')
INSERT Images(Id,ImageId,Img) Values(N'CB4',34,N'34.jpg')
INSERT Images(Id,ImageId,Img) Values(N'CB5',35,N'35.jpg')
INSERT Images(Id,ImageId,Img) Values(N'CB6',36,N'36.jpg')
INSERT Images(Id,ImageId,Img) Values(N'CB7',37,N'37.jpg')
INSERT Images(Id,ImageId,Img) Values(N'CB8',38,N'38.jpg')
INSERT Images(Id,ImageId,Img) Values(N'CB9',39,N'39.jpg')
INSERT Images(Id,ImageId,Img) Values(N'CB10',40,N'40.jpg')

--Product
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk1',N'Gà ráng',N'1 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay',35000,1,N'SP1',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk2',N'Gà Địa Trung Hải',N'1 Miếng Gà Địa Trung Hải',41000,1,N'SP2',1)

INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk3',N'Gà que kem xốt Cajun',N'1 Que gà kem sốt Cajun',40000,1,N'SP3',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk4',N'Gà đùi quay',N'1 Gà đùi quay giấy bạc/ đùi gà quay tiêu',74000,1,N'SP4',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk5',N'Phi-lê gà quay',N'1 miếng phi-lê gà quay Flava phi-lê gà quay tiêu',38000,1,N'SP5',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk6',N'Burger Zinger',N'1 Burger Zinger',54000,3,N'SP6',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk7',N'Burger Tôm',N'1 Burger Tôm',44000,3,N'SP7',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk8',N'Burger gà quay Flava',N'1 Burger gà quay Flava',54000,3,N'SP8',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk9',N'Cơm gà xiên que',N'1 Cơm gà xiên que',45000,2,N'SP9',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk10',N'Cơm gà Tederods',N'1 Cơm gà Tederods',45000,2,N'SP10',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk11',N'Cơm gà Teriyaki',N'1 Cơm gà Teriyaki',45000,2,N'SP11',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk12',N'Cơm gà Bít-tết',N'1 Cơm gà Bít-tết',45000,2,N'SP12',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk13',N'Khoai tây chiên (vừa)',N'Khoai tây chiên (vừa)',19000,4,N'SP13',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk14',N'Khoai tây chiên (Lớn)',N'Khoai tây chiên (Lớn)',28000,4,N'SP14',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk15',N'Khoai tây chiên (Đại)',N'Khoai tây chiên (Đại)',38000,4,N'SP15',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk16',N'Khoai tây múi cau (Vừa)',N'Khoai tây múi cau (Vừa)',23000,4,N'SP16',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk17',N'Khoai tây múi cau (Lớn)',N'Khoai tây múi cau (Lớn)',43000,4,N'SP17',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk18',N'Khoai tây nghiền (Vừa)',N'Khoai tây nghiền (Vừa)',12000,4,N'SP18',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk19',N'Khoai tây nghiên (Lớn)',N'Khoai tây nghiên (Lớn)',22000,4,N'SP19',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk20',N'Khoai tây nghiền (Đại)',N'Khoai tây nghiền (Đại)',31000,4,N'SP20',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk21',N'Bắp cải trộn  (Vừa)',N'Bắp cải trộn  (Vừa)',12000,4,N'SP21',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk22',N'Bắp cải trộn  (Lớn)',N'Bắp cải trộn  (Lớn)',22000,4,N'SP22',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk23',N'Bắp cải trộn  (Đại)',N'Bắp cải trộn  (Đại)',31000,4,N'SP23',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk24',N'Salad hạt',N'Salad hạt',35000,4,N'SP24',1)

INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk25',N'Coca',N'1 Ly coca tươi size L',22000,5,N'SP25',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk26',N'Sữa tươi',N'1 Ly sữa tươi size L',22000,5,N'SP26',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk27',N'Fanta',N'1 Ly fanta cam size L',22000,5,N'SP27',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk28',N'Nước suối',N'1 Chai nước suối 350ml',22000,5,N'SP28',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk29',N'Sprite®',N'1 Ly sprite size L',22000,5,N'SP29',1)
INSERT Products(PromotionId,SKU,Name,Description,Price,ProductTypeId,Image,Status) VALUES (NULL,N'spdk30',N'Milo',N'1 Hợp sữa milo 150ml',22000,5,N'SP30',1)

--Promotions

INSERT Promotions(PromotionName,Description,PromotionValue,StartDate,EndDate,Status) VALUES (N'Khuyến mãi Noel',N'Giảm giá cho các sản phẩm vào dịp Giáng sinh',10,'2023-12-1','2023-12-31',1)
INSERT Promotions(PromotionName,Description,PromotionValue,StartDate,EndDate,Status) VALUES (N'Khuyến mãi cuối tháng',N'Giảm giá cho các sản phẩm vào cuối tháng',10,'2023-12-30','2023-12-31',1)

--Combo
INSERT Combo(ProductTypeId,Name,Image,Price,Status) VALUES (6,N'Combo mùa hè',N'CB1',79000,1)
INSERT Combo(ProductTypeId,Name,Image,Price,Status) VALUES (6,N'Combo khoai tây',N'CB2',59000,1)
INSERT Combo(ProductTypeId,Name,Image,Price,Status) VALUES (6,N'Combo gà',N'CB3',79000,1)
INSERT Combo(ProductTypeId,Name,Image,Price,Status) VALUES (6,N'Combo bữa sáng',N'CB4',67000,1)
INSERT Combo(ProductTypeId,Name,Image,Price,Status) VALUES (6,N'Combo bữa sáng năng lượng',N'CB5',67000,1)
INSERT Combo(ProductTypeId,Name,Image,Price,Status) VALUES (6,N'Combo giải nhiệt',N'CB6',99000,1)
INSERT Combo(ProductTypeId,Name,Image,Price,Status) VALUES (6,N'Combo burger tôm',N'CB7',66000,1)
INSERT Combo(ProductTypeId,Name,Image,Price,Status) VALUES (6,N'Combo nâng cấp burger tôm',N'CB8',88000,1)
INSERT Combo(ProductTypeId,Name,Image,Price,Status) VALUES (6,N'Combo burger x2',N'CB9',136000,1)
INSERT Combo(ProductTypeId,Name,Image,Price,Status) VALUES (6,N'Combo truyền thống',N'CB10',66000,1)

--Combodetails
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (1, 1, N'1 Miếng Gà Giòn Cay')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (1, 22, N'1 Bắp cải trộn  (Lớn)')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (1, 27, N'1 Ly fanta cam size L')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (2, 15, N'Khoai tây chiên (Đại)')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (2, 25, N'1 Ly coca tươi size L')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (3, 1, N'1 Miếng Gà Giòn Cay')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (3, 25, N'2 Ly coca tươi size L')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (4, 25, N'1 Ly coca tươi size L')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (4, 10, N'1 Cơm gà Tederods')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (5, 10, N'1 Cơm gà Tederods')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (5, 30, N'1 Hợp sữa milo 150ml')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (6, 29, N'1 Ly sprite size L')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (6, 24, N'1 Salad hạt')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (6, 15, N'1 Khoai tây chiên (Đại)')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (7, 7, N'1 Burger Tôm')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (7, 25, N'1 Ly coca tươi size L')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (8, 25, N'1 Ly coca tươi size L')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (8, 22, N'1 Bắp cải trộn  (Lớn)')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (8, 7, N'1 Burger Tôm')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (9, 7, N'1 Burger Tôm')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (9, 8, N'1 Burger gà quay Flava')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (9, 15, N'Khoai tây chiên (Đại)')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (10, 7, N'1 Burger Tôm')
INSERT ComboDetails(ComboId,ProductId,Description) VALUES (10, 28, N'1 Chai nước suối 350ml')

-- OrderStatuses
INSERT OrderStatuses(Name) VALUES(N'Đã đặt')
INSERT OrderStatuses(Name) VALUES(N'Đã xác nhận')
INSERT OrderStatuses(Name) VALUES(N'Đang giao')
INSERT OrderStatuses(Name) VALUES(N'Đã giao')
INSERT OrderStatuses(Name) VALUES(N'Đã hủy')




-- User
--INSERT AspNetUsers([UserName],[Email],[PasswordHash],[PhoneNumber],[EmailConfirmed],) VALUES (N'dang0',N'dang0@gmail.com',N'Dang0@',N'0989884587')


--Ivoices

INSERT Invoices([PromotionId],[UserId],[IssuedDate],[ShippingAddress],[ShippingPhone],[Total],[Status]) VALUES(1,N'3fd3d8ef-4f5f-4a78-8e7e-5404714d2924','2023-12-20',N'16 LTK,p7 Q10,tp HCM','098955855',250000,1)
INSERT Invoices([PromotionId],[UserId],[IssuedDate],[ShippingAddress],[ShippingPhone],[Total],[Status]) VALUES(1,N'f7cc7702-a958-4b72-bc78-96788ee39176','2023-12-20',N'16 LTK,p7 Q10,tp HCM','098955855',350000,1)
INSERT Invoices([PromotionId],[UserId],[IssuedDate],[ShippingAddress],[ShippingPhone],[Total],[Status]) VALUES(1,N'f7cc7702-a958-4b72-bc78-96788ee39176','2023-12-20',N'16 LTK,p7 Q10,tp HCM','098955855',150000,1)


--Favorites
 INSERT Favorites (ProductId,UserId) VALUES(1,N'8ca32a40-1993-4a1b-8026-02ead794bb8f')

 -- Cart
 INSERT Carts ([UserId],[ProductId],[ComboId],[Quantity]) VALUES(N'3ec25ec5-4fe3-4ad9-80c2-4255c9451c25',1,null,1)
 INSERT Carts ([UserId],[ProductId],[ComboId],[Quantity]) VALUES(N'3ec25ec5-4fe3-4ad9-80c2-4255c9451c25',5,null,1)
















