/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Button, Col, Container, Row } from "react-bootstrap";
import Style from "@/styles/dashboard/bookingCategory.module.css";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";

export default function BookingCategory() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [loadingBtns, setLoadingBtns] = useState({});
  const router = useRouter();

  const cookieValue = Cookies.get("TOKEN_LOGIN");
  useEffect(() => {
    setLoading(true);
    axios
      .get(BASE_URL + "/category", {
        headers: {
          // Set your cookie in the request headers
          TOKEN_LOGIN: cookieValue,
        },
      })
      .then((response) => {
        setCategory(response?.data?.data);
        setLoading(false);
      });
  }, [cookieValue]);

  const handleBooking = async (id) => {
    
    const url = BASE_URL + "/invoice_create";
    try {
      setLoadingBtns((prevLoadingBtns) => ({ ...prevLoadingBtns, [id]: true }));
      const newData = {
        category_id: id,
      };
      const response = await axios.post(url, newData, {
        headers: {
          // Set your cookie in the request headers
          TOKEN_LOGIN: cookieValue,
        },
      });
      if (response.status === 200) {
        if (response.data.status === 200) {
          toast.success(response.data.message);
          router.push('/dashboard/payment')
        } else if (
          response.data.status === 300 ||
          response.data.status === 400 ||
          response.data.status === 600 
        ) {
          toast.error(response.data.message);
        } else if (response.data.status === 700) {
          toast.error(response.data.message.category_id[0]);
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      // Update loading state for the specific category ID after API call completion
      setLoadingBtns((prevLoadingBtns) => ({ ...prevLoadingBtns, [id]: false }));
    }
  };

  return (
    <>
      <Head>
        <title>DASHBOARD::BookingCategory::Dhaka University Chemistry Alumni Association</title>
        <meta name="description" content="BookingCategory" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        <>
          <div className={`${Style.mainContainer} d-flex`}>
            {/* Dashboard Left Side and Header */}
            <DashboardLeftSide />

            {/* Main Content */}
            <div className={`${Style.content} px-4`}>
              <Row className="mb-4 mt-4">
                <div
                  className="headerTitle mt-0 mb-0 text-left"
                  style={{ textAlign: "left" }}
                >
                  <h3
                    class="headerTitleMain text-left"
                    style={{ textAlign: "left" }}
                  >
                    Booking Category
                  </h3>
                </div>
                <Col md={9} sm={12}>
                  {
                    loading ? (
                      <LoadingSpinner /> 
                    ) : (
                      <Row>
                    {category.map((item) => (
                      <Col md={4} sm={6} key={item.id}>
                        <div
                          className="card mb-2"
                        >
                          <div className="card-body">
                            <h5 className={Style.cardTitle}>
                              {item?.category}
                            </h5>
                            <p className={Style.cardDesc}>৳ {item?.amount}</p>
                            <Button
                                onClick={() => handleBooking(item?.id)}
                                disabled={loadingBtns[item?.id]}
                              >
                                {loadingBtns[item?.id] ? 'Processing...' : 'Booking Now'}
                              </Button>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                    )
                  }
                  
                </Col>
              </Row>
            </div>
          </div>
        </>
      </main>
    </>
  );
}
