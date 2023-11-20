/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Style from "@/styles/dashboard/payment.module.css";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function DashboardPayment() {
  const [paymentView, setPaymentView] = useState([]);
  const [invoiceView, setInvoiceView] = useState(true);

  const cookieValue = Cookies.get("TOKEN_LOGIN");

  useEffect(() => {
    axios
      .get(BASE_URL + "/invoice_view", {
        headers: {
          // Set your cookie in the request headers
          TOKEN_LOGIN: cookieValue,
        },
      })
      .then((response) => {
        setPaymentView(response?.data?.data);
      });
  }, [cookieValue, invoiceView]);

  const handleDownload = async (id) => {
    console.log(id)
    await axios
      .get(BASE_URL + `/invoice_pdf/${id}`, {
        headers: {
          "Cache-Control": "no-cache",
          // Set your cookie in the request headers
          TOKEN_LOGIN: cookieValue,
        },
      })
      .then((response) => {
        // setInvoiceValue(response?.data);
        const doc = new jsPDF();
        const fontSize = 10; // Change this to the desired font size
        doc.setFont("helvetica");
        doc.setFontSize(fontSize);

        const { tran_id, name, member_card, phone, payment_date } =
          response?.data?.data[0];
        const { nameen, address, mobile, email } = response?.data?.admin;

        const xPosition = 40; // Adjust these coordinates as needed
        const yPosition = 10; // Adjust these coordinates as needed

        doc.text(nameen, xPosition, yPosition + 8);
        doc.text(address, xPosition, yPosition + 16);
        doc.text(mobile, xPosition, yPosition + 24);
        doc.text(email, xPosition, yPosition + 32);

        doc.text(`Invoice ID: ${tran_id}`, 15, yPosition + 50);
        doc.text(`Invoice Date: ${payment_date}`, 15, yPosition + 58);
        doc.text(`Name: ${name}`, 15, yPosition + 66);
        doc.text(`Member Card ${member_card}`, 15, yPosition + 74);
        doc.text(`Phone: ${phone}`, 15, yPosition + 82);

        // Define table columns
        const columns = [
          "Description",
          "Payment Status",
          "Payment Type",
          "Payment Method",
          "Total Amount",
        ];

        // Use the fetched data for table rows
        const data2 = response?.data?.data?.map((row) => [
          row.category,
          row.payment_status === "1" && "paid",
          row.payment_type,
          row.payment_method,
          row.total_amount,
        ]);

        // AutoTable plugin to create the table
        doc.autoTable({
          head: [columns],
          body: data2,
          startY: 102,
        });
        doc.save(`invoice-${tran_id}.pdf`);
      });
  };

  const handleDocumentsDownload = async (id) => {
    await axios
      .get(BASE_URL + `/invoice_pdf/${id}`, {
        headers: {
          "Cache-Control": "no-cache",
          // Set your cookie in the request headers
          TOKEN_LOGIN: cookieValue,
        },
      })
      .then((response) => {
        // setInvoiceValue(response?.data);
        const doc = new jsPDF();
        // const fontSize = 10; // Change this to the desired font size
        doc.setFont("helvetica");
        // doc.setFontSize(fontSize);

        const { tran_id, name, member_card, category } =
          response?.data?.data[0];
        const { token1, token2, token3, token4, token5, token6 } =
          response?.data?.admin;

        if (token1) {
          doc.setFontSize(14);
          doc.text(category, 60, 20);
          doc.setFontSize(10);
          doc.text(`Member Card: ${member_card}`, 10, 30);
          doc.text(`Member Name: ${name}`, 10, 40);
          doc.text(`Invoice ID: ${tran_id}`, 130, 30);
          doc.text(`Token Type: ${token1}`, 130, 40);
          doc.rect(5, 12, 200, 35, "S");
        }

        if (token2) {
          doc.setFontSize(14);
          doc.text(category, 60, 70);
          doc.setFontSize(10);
          doc.text(`Member Card: ${member_card}`, 10, 80);
          doc.text(`Member Name: ${name}`, 10, 90);
          doc.text(`Invoice ID: ${tran_id}`, 130, 80);
          doc.text(`Token Type: ${token2}`, 130, 90);
          doc.rect(5, 62, 200, 35, "S");
        }

        if (token3) {
          doc.setFontSize(14);
          doc.text(category, 60, 120);
          doc.setFontSize(10);
          doc.text(`Member Card: ${member_card}`, 10, 130);
          doc.text(`Member Name: ${name}`, 10, 140);
          doc.text(`Invoice ID: ${tran_id}`, 130, 130);
          doc.text(`Token Type: ${token3}`, 130, 140);
          doc.rect(5, 112, 200, 35, "S");
        }

        if (token4) {
          doc.setFontSize(14);
          doc.text(category, 60, 170);
          doc.setFontSize(10);
          doc.text(`Member Card: ${member_card}`, 10, 180);
          doc.text(`Member Name: ${name}`, 10, 190);
          doc.text(`Invoice ID: ${tran_id}`, 130, 180);
          doc.text(`Token Type: ${token4}`, 130, 190);
          doc.rect(5, 162, 200, 35, "S");
        }

        if (token5) {
          doc.setFontSize(14);
          doc.text(category, 60, 220);
          doc.setFontSize(10);
          doc.text(`Member Card: ${member_card}`, 10, 230);
          doc.text(`Member Name: ${name}`, 10, 240);
          doc.text(`Invoice ID: ${tran_id}`, 130, 230);
          doc.text(`Token Type: ${token5}`, 130, 240);
          doc.rect(5, 212, 200, 35, "S");
        }

        if (token6) {
          doc.setFontSize(14);
          doc.text(category, 60, 270);
          doc.setFontSize(10);
          doc.text(`Member Card: ${member_card}`, 10, 280);
          doc.text(`Member Name: ${name}`, 10, 290);
          doc.text(`Invoice ID: ${tran_id}`, 130, 280);
          doc.text(`Token Type: ${token6}`, 130, 290);
          doc.rect(5, 262, 200, 35, "S");
        }
        doc.save(`document-${tran_id}.pdf`);
      });
  };

  // Cancel button
  const handleCancel = async (id) => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete?');

    if(isConfirmed){
      await axios
      .get(BASE_URL + `/invoice_delete/${id}`, {
        headers: {
          "Cache-Control": "no-cache",
          // Set your cookie in the request headers
          TOKEN_LOGIN: cookieValue,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.status === 200) {
            toast.success(response.data.message);
            setInvoiceView(!invoiceView);
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
      });
    }
    
  };

  return (
    <>
      <Head>
        <title>
          DASHBOARD::Payment::Dhaka University Chemistry Alumni Association
        </title>
        <meta name="description" content="Dashboard Payment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        <div className={`${Style.mainContainer} d-flex`}>
          {/* Dashboard Left Side and Header */}
          <DashboardLeftSide />

          {/* Main Content */}
          <div className={`${Style.content} px-4 pt-3`}>
            <div
              className="headerTitle text-left mb-0"
              style={{ textAlign: "left" }}
            >
              <h3 class="headerTitleMain mb-0" style={{ textAlign: "left" }}>
                Payment Information
              </h3>
            </div>
            <Row>
              <Col lg={10} md={8} sm={12}>
                <div className="table-responsive">
                  <Table striped bordered hover className="">
                    <thead>
                      <tr>
                        <th className={Style.tableHeader}>Invoice Id</th>
                        <th className={Style.tableHeader}>Category</th>
                        <th className={Style.tableHeader}>Total Amount</th>
                        <th className={Style.tableHeader}>Payment Status</th>
                        <th className={Style.tableHeader}>Payment Type</th>
                        <th className={Style.tableHeader}>Payment Time</th>
                        <th className={Style.tableHeader}>Invoice Cancel</th>
                        <th className={Style.tableHeader}>Invoice Print</th>
                        <th className={Style.tableHeader}>Download Token</th>
                        <th className={Style.tableHeader}>Pay Now</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentView.map((payment) => (
                        <tr key={payment.id}>
                          <td className={Style.tableText}>
                            {payment?.tran_id}
                          </td>
                          <td className={Style.tableText}>
                            {payment.category}
                          </td>
                          <td className={Style.tableText}>
                            {payment.total_amount}
                          </td>
                          {payment.payment_status === "1" ? (
                            <td className={Style.tableText}>
                              <Button size="sm">Paid</Button>
                            </td>
                          ) : (
                            <td className={Style.tableText}>
                              <Button
                                size="sm"
                                className={Style.headerTopButton}
                              >
                                Pending
                              </Button>
                            </td>
                          )}
                          <td className={Style.tableText}>
                            {payment.payment_type !== null
                              ? payment.payment_type
                              : "--"}
                          </td>
                          <td className={Style.tableText}>
                            {payment.payment_time !== null
                              ? payment.payment_time
                              : "--"}
                          </td>
                          <td className={Style.tableText}>
                          {payment.payment_status !== "0" ? (
                              <p>---</p>
                            ) : (
                              <Button variant="danger"
                              size="sm"
                              onClick={() => handleCancel(payment?.id)}
                            >
                              Cancel
                            </Button>
                            )}
                            
                          </td>
                          <td className={Style.tableText}>
                            {payment.payment_status !== "1" ? (
                              <p>---</p>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleDownload(payment?.id)
                                }
                              >
                                Print
                              </Button>
                            )}
                          </td>
                          <td className={Style.tableText}>
                            {payment.payment_status !== "1" ? (
                              <p>---</p>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleDocumentsDownload(payment?.id)
                                }
                              >
                                Download
                              </Button>
                            )}
                          </td>

                          <td className={Style.tableText}>
                            {payment.payment_status !== "0" ? (
                              <Button size="sm" disabled>
                                Paid
                              </Button>
                            ) : (
                              <a
                                href={`https://amaderthikana.com/epay/${payment?.admin_name}/${payment?.tran_id}`}
                              >
                                <Button size="sm">
                                  Pay Now
                                </Button>
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </main>
    </>
  );
}
