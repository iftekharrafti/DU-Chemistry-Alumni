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
import Link from "next/link";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function DashboardPayment() {
  const [categoryValue, setCategoryValue] = useState("");
  const [paymentView, setPaymentView] = useState([]);
  const [invoiceValue, setInvoiceValue] = useState([]);

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
  }, []);

  // useEffect(() => {

  // }, []);

  const handleDownload = async (id) => {
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

        const { id, name, member_card, phone, payment_date } =
          response?.data?.data[0];
        const { nameen, address, mobile, email } = response?.data?.admin;

        const xPosition = 40; // Adjust these coordinates as needed
        const yPosition = 10; // Adjust these coordinates as needed

        doc.text(nameen, xPosition, yPosition + 8);
        doc.text(address, xPosition, yPosition + 16);
        doc.text(mobile, xPosition, yPosition + 24);
        doc.text(email, xPosition, yPosition + 32);

        doc.text(`Invoice ID: ${id}`, 15, yPosition + 50);
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
        doc.save("invoice.pdf");
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

        const { id, name, member_card, category } = response?.data?.data[0];
        const { token1, token2, token3, token4, token5, token6 } =
          response?.data?.admin;

        if (token1) {
          doc.setFontSize(14);
          doc.text(category, 70, 10);
          doc.setFontSize(10);
          doc.text(`Member Card: ${member_card}`, 10, 20);
          doc.text(`Member Name: ${name}`, 10, 30);
          doc.text(`Invoice ID: ${id}`, 110, 20);
          doc.text(`Token Type: ${token1}`, 110, 30);
        }

        if (token2) {
          doc.setFontSize(14);
          doc.text(category, 70, 50);
          doc.setFontSize(10);
          doc.text(`Member Card: ${member_card}`, 10, 60);
          doc.text(`Member Name: ${name}`, 10, 70);
          doc.text(`Invoice ID: ${id}`, 110, 60);
          doc.text(`Token Type: ${token2}`, 110, 70);
        }

        if (token3) {
          doc.setFontSize(14);
          doc.text(category, 70, 100);
          doc.setFontSize(10);
          doc.text(`Member Card: ${member_card}`, 10, 110);
          doc.text(`Member Name: ${name}`, 10, 120);
          doc.text(`Invoice ID: ${id}`, 110, 110);
          doc.text(`Token Type: ${token3}`, 110, 120);
        }

        if (token4) {
          doc.setFontSize(14);
          doc.text(category, 70, 150);
          doc.setFontSize(10);
          doc.text(`Member Card: ${member_card}`, 10, 160);
          doc.text(`Member Name: ${name}`, 10, 170);
          doc.text(`Invoice ID: ${id}`, 110, 160);
          doc.text(`Token Type: ${token4}`, 110, 170);
        }

        if (token5) {
          doc.setFontSize(14);
          doc.text(category, 70, 200);
          doc.setFontSize(10);
          doc.text(`Member Card: ${member_card}`, 10, 210);
          doc.text(`Member Name: ${name}`, 10, 220);
          doc.text(`Invoice ID: ${id}`, 110, 210);
          doc.text(`Token Type: ${token5}`, 110, 220);
        }

        if (token6) {
          doc.setFontSize(14);
          doc.text(category, 70, 250);
          doc.setFontSize(10);
          doc.text("Member Card: ${member_card}", 10, 260);
          doc.text("Member Name: ${name}", 10, 270);
          doc.text("Invoice ID: ${id}", 110, 260);
          doc.text("Token Type: ${token6}", 110, 270);
        }
        doc.save("document.pdf");
      });
  };

  return (
    <>
      <Head>
        <title>DASHBOARD::Payment</title>
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
                        <th className={Style.tableHeader}>Category</th>
                        <th className={Style.tableHeader}>Total Amount</th>
                        <th className={Style.tableHeader}>Payment Status</th>
                        <th className={Style.tableHeader}>Payment Type</th>
                        <th className={Style.tableHeader}>Payment Time</th>
                        <th className={Style.tableHeader}>Invoice Print</th>
                        <th className={Style.tableHeader}>Download Document</th>
                        <th className={Style.tableHeader}>Pay Now</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentView.map((payment) => (
                        <tr key={payment.id}>
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
                            {payment.payment_status !== "1" ? (
                              <Button size="sm" disabled>
                                Print
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleDownload(payment?.category_id)
                                }
                              >
                                Print
                              </Button>
                            )}
                          </td>
                          <td className={Style.tableText}>
                            {payment.payment_status !== "1" ? (
                              <Button size="sm" disabled>
                                Print
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleDocumentsDownload(payment?.category_id)
                                }
                              >
                                Download
                              </Button>
                            )}
                          </td>

                          <td className={Style.tableText}>
                            <Button size="sm">Pay Now</Button>
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
