import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Customer/Register";
import Product from "./Pages/Customer/Product";
import ProductDetail from "./Pages/Customer/ProductDetail";
import Account from "./Pages/Customer/Account";
import AccountChangPassWord from "./Pages/Customer/AccountChangePassword";
import AccountEdit from "./Pages/Customer/AccountEdit";
import Cart from "./Pages/Customer/Cart";
import Index from "./Pages/Admin/index";
import ProductAd from "./Pages/Admin/Product";
import ProductAdAdd from "./Pages/Admin/ProductAdd";
import ProductAdEdit from "./Pages/Admin/ProductEdit";
import ProductTypeAd from "./Pages/Admin/ProdcutType";
import ProductTypeAdAdd from "./Pages/Admin/ProductTypeAdd";
import ProductTypeAdEdit from "./Pages/Admin/ProductTypeEdit";
import AccountAd from "./Pages/Admin/Account";
import AccountAdAdd from "./Pages/Admin/AccountAdd";
import AccountAdEdit from "./Pages/Admin/AccountEdit";
import InvoiceAd from "./Pages/Admin/Invoice";
import InvoiceAdAdd from "./Pages/Admin/InvoiceAdd";
import InvoiceAdEdit from "./Pages/Admin/InvoiceEdit";
import Promotion from "./Pages/Admin/Promotion";
import PromotionAdd from "./Pages/Admin/PromotionAdd";
import PromotionEdit from "./Pages/Admin/PromotionEdit";
import Slideshow from "./Pages/Admin/Slideshow";
import SlideshowAdd from "./Pages/Admin/SlideshowAdd";
import SlideshowEdit from "./Pages/Admin/SlideshowEdit";
import Statistic from "./Pages/Admin/Statistic";
import PagePreloder from "./Pages/Component/PagePreloder";
import HeaderSection from "./Pages/Component/HeaderSection";
import HeroSection from "./Pages/Component/HeroSection";
import CategoriesSection from "./Pages/Component/CategoriesSection";
import FeaturedSection from "./Pages/Component/FeaturedSection";
import Footer from "./Pages/Component/FooterSection";
import Contact from "./Pages/Customer/Contact";
import DangNhap from "./Pages/Customer/Login";
import Categori from "./Pages/Customer/Categori";
import DangKy from "./Pages/Customer/Register";
import Login from "./Pages/Admin/login";
import FavoriteList from "./Pages/Customer/FavoriteList";
import ToPay from "./Pages/Customer/ToPay";
import InvoiceUser from "./Pages/Customer/oderManagement";
import Combo from "./Pages/Admin/Combo";
import ComBoAdd from "./Pages/Admin/ComboAdd";
import ComBoEdit from "./Pages/Admin/ComboEdit";

function App() {
  return (
    <>
      <BrowserRouter>
        <div></div>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <>
                  <PagePreloder />
                  <HeaderSection />
                  <HeroSection />
                  <CategoriesSection />
                  <FeaturedSection />
                  <Footer />
                </>
              }
            />
          </Route>
        </Routes>
        <Routes>
          <Route path="Shop">
            <Route
              index
              element={
                <>
                  <PagePreloder />
                  <HeaderSection />
                  <Product />
                  <Footer />
                </>
              }
            />
            <Route
              path="categori/:id"
              element={
                <>
                  <PagePreloder />
                  <HeaderSection />
                  <Categori />
                  <Footer />
                </>
              }
            />
            <Route path="product">
              <Route
                path="detail/:id"
                element={
                  <>
                    <PagePreloder />
                    <HeaderSection />
                    <ProductDetail />
                    <Footer />
                  </>
                }
              />
            </Route>

            <Route path="account">
              <Route
                index
                element={
                  <>
                    <PagePreloder />
                    <HeaderSection /> <Account /> <Footer />
                  </>
                }
              />
              <Route path="changpassword" element={<AccountChangPassWord />} />
              <Route path="edit/:id" element={<AccountEdit />} />
              <Route
                path="orderManagement"
                element={
                  <>
                    <PagePreloder />
                    <HeaderSection /> <InvoiceUser /> <Footer />
                  </>
                }
              />
            </Route>
            <Route
              path="topay"
              element={
                <>
                  <PagePreloder />
                  <HeaderSection /> <ToPay /> <Footer />{" "}
                </>
              }
            />
            <Route path="register" element={<Register />} />
            <Route
              path="cart"
              element={
                <>
                  <PagePreloder />
                  <HeaderSection />
                  <Cart />
                  <Footer />
                </>
              }
            />
            <Route
              path="favoriteList/:id"
              element={
                <>
                  <PagePreloder />
                  <HeaderSection />
                  <FavoriteList />
                  <Footer />
                </>
              }
            />
          </Route>
          <Route
            path="contact"
            element={
              <>
                <PagePreloder />
                <HeaderSection />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route path="NguoiDung">
            <Route
              path="DangNhap"
              element={
                <>
                  <PagePreloder />
                  <HeaderSection />
                  <DangNhap />
                  <Footer />
                </>
              }
            />
            <Route
              path="Dangky"
              element={
                <>
                  <PagePreloder />
                  <HeaderSection />
                  <DangKy />
                  <Footer />
                </>
              }
            />
          </Route>
        </Routes>

        <Routes>
          <Route path="admin">
            <Route index element={<Index />} />
            <Route path="product">
              <Route
                index
                element={
                  <Index>
                    <ProductAd />
                  </Index>
                }
              />
              <Route
                path="create"
                element={
                  <Index>
                    <ProductAdAdd />
                  </Index>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <Index>
                    <ProductAdEdit />
                  </Index>
                }
              />
            </Route>

            <Route path="login">
              <Route index element={<Login />} />
            </Route>
            <Route path="productType">
              <Route
                index
                element={
                  <Index>
                    <ProductTypeAd />
                  </Index>
                }
              />
              <Route
                path="create"
                element={
                  <Index>
                    <ProductTypeAdAdd />
                  </Index>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <Index>
                    <ProductTypeAdEdit />
                  </Index>
                }
              />
            </Route>

            <Route path="account">
              <Route
                index
                element={
                  <Index>
                    <AccountAd />
                  </Index>
                }
              />
              <Route
                path="create"
                element={
                  <Index>
                    <AccountAdAdd />
                  </Index>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <Index>
                    <AccountAdEdit />
                  </Index>
                }
              />
            </Route>

            <Route path="invoice">
              <Route
                index
                element={
                  <Index>
                    <InvoiceAd />
                  </Index>
                }
              />
              <Route
                path="create"
                element={
                  <Index>
                    <InvoiceAdAdd />
                  </Index>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <Index>
                    <InvoiceAdEdit />
                  </Index>
                }
              />
            </Route>

            <Route path="combo">
              <Route
                index
                element={
                  <Index>
                    <Combo />
                  </Index>
                }
              />
              <Route
                path="create"
                element={
                  <Index>
                    <ComBoAdd />
                  </Index>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <Index>
                    <ComBoEdit />
                  </Index>
                }
              />
            </Route>

            <Route path="promotion">
              <Route
                index
                element={
                  <Index>
                    <Promotion />
                  </Index>
                }
              />
              <Route
                path="create"
                element={
                  <Index>
                    <PromotionAdd />
                  </Index>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <Index>
                    <PromotionEdit />
                  </Index>
                }
              />
            </Route>

            <Route path="statistic">
              <Route index element={<Statistic />} />
            </Route>
            <Route path="*"> 404 Not found </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
