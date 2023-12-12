/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Style from "@/styles/dashboard/updateInfo.module.css";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL, TITLE } from "@/utils/api";
import { baseImgUrl } from "@/utils/imgUrl";
import { useRouter } from "next/router";

export default function UpdateInfo() {
  const [profileData, setProfileData] = useState({});
  
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [errorMessage, setErrorMessage] = useState({});
  const [selectedDegreeCategoryOption, setSelectedDegreeCategoryOption] =
    useState(profileData?.category);
  const [selectedGenderOption, setSelectedGenderOption] = useState(
    profileData?.gender
  );
  const [selectedBloodGroupOption, setSelectedBloodGroupOption] = useState(
    profileData?.blood
  );

  const router = useRouter();

  // Select degree category
  const handleDegreeCategorySelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDegreeCategoryOption(selectedValue);
  };

  // Select Gender Category
  const handleGenderSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedGenderOption(selectedValue);
  };

  // Select blood category
  const handleBloodSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedBloodGroupOption(selectedValue);
  };

  useEffect(() => {
    const cookieValue = Cookies.get("TOKEN_LOGIN");

    axios
      .get(BASE_URL + "/member_profile", {
        headers: {
          // Set your cookie in the request headers
          TOKEN_LOGIN: cookieValue,
        },
      })
      .then((response) => {
        setProfileData(response?.data?.data);
      });
  }, []);

  const [formUpdateData, setFormUpdateData] = useState({
    name: profileData?.name || "",
    email: profileData?.email || "",
    phone: profileData?.phone || "",
    degree_category: profileData?.degree_category || "",
    gender: profileData?.gender || "",
    blood: profileData?.blood || "",
    country: profileData?.country || "",
    city: profileData?.city || "",
    occupation: profileData?.occupation || "",
    organization: profileData?.organization || "",
    designation: profileData?.designation || "",
    web_link: profileData?.web_link || "",
    affiliation: profileData?.affiliation || "",
    training: profileData?.training || "",
    expertise: profileData?.expertise || "",
    // Add other fields here
  });
  
  useEffect(() => {
    setSelectedDegreeCategoryOption(profileData?.degree_category)
    setSelectedGenderOption(profileData?.gender)
    setSelectedBloodGroupOption(profileData?.blood)
  },[profileData])

  
  
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  useEffect(() => {
    // Populate the form values with default values from profileData
    setFormUpdateData({
      name: profileData?.name || "",
      email: profileData?.email || "",
      phone: profileData?.phone || "",
      degree_category: profileData?.degree_category || "",
      gender: profileData?.gender || "",
      blood: profileData?.blood || "",
      country: profileData?.country || "",
      city: profileData?.city || "",
      occupation: profileData?.occupation || "",
      organization: profileData?.organization || "",
      designation: profileData?.designation || "",
      web_link: profileData?.web_link || "",
      affiliation: profileData?.affiliation || "",
      training: profileData?.training || "",
      expertise: profileData?.expertise || "",
    });
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUpdateData({
      ...formUpdateData,
      [name]: value,
    });
  };

  const updateSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingBtn(true);
      const cookieValue = Cookies.get("TOKEN_LOGIN");

      const formData = new FormData();

      formData.append("name", formUpdateData.name);
      formData.append("email", formUpdateData.email);
      formData.append("phone", formUpdateData.phone);
      formData.append("degree_category", selectedDegreeCategoryOption);
      if (image) {
        formData.append("profile_image", image);
      }
      formData.append("gender", selectedGenderOption);
      formData.append("blood", selectedBloodGroupOption);
      formData.append("country", formUpdateData.country);
      formData.append("city", formUpdateData.city);
      formData.append("occupation", formUpdateData.occupation);
      formData.append("organization", formUpdateData.organization);
      formData.append("designation", formUpdateData.designation);
      formData.append("web_link", formUpdateData.web_link);
      formData.append("affiliation", formUpdateData.affiliation);
      formData.append("training", formUpdateData.training);
      formData.append("expertise", formUpdateData.expertise);

      const response = await axios({
        method: "post",
        url: BASE_URL + "/member_update",
        data: formData,
        headers: {
          // "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          TOKEN_LOGIN: cookieValue,
        },
      });
      
      
      if (response.status === 200) {
        if (response.data.status === 200) {
          const profileData = {
            name: response.data.data.name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            profile_image: response.data.data.profile_image,
          };
          localStorage.removeItem("user-info");
          
          localStorage.setItem("user-info", JSON.stringify(profileData));
          toast.success(response?.data?.message);
          router.push("/dashboard/profile");
          setLoadingBtn(false);
        } else if (response.data.status === 500) {
          toast.error(response?.data?.message);
          setLoadingBtn(false);
          router.push("/login");
        } else if (
          response.data.status === 700 ||
          response.data.status === 600
        ) {
          toast.error(response?.data?.message);
          setLoadingBtn(false);
        } else {
          toast.error("Something went wrong");
          setLoadingBtn(false);
        }
      }
    } catch (err) {
      toast.error("Something went wrong");
      setLoadingBtn(false);
    }
  };

  return (
    <>
      <Head>
        <title>DASHBOARD:: Update Profile ::{TITLE}</title>
        <meta name="description" content={TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <div className="loadingContainer">
            <img src="./loading.gif" alt="" className="loadingGif" />
          </div>
        ) : (
          <>
            <div className={`${Style.mainContainer} d-flex`}>
              {/* Dashboard Left Side and Header */}
              <DashboardLeftSide />

              {/* Main Content */}
              <div className={`${Style.content} px-4 mt-3 mb-3`}>
                <Row>
                <Col lg={8} md={10} sm={12} className="mx-auto">

                <img src={baseImgUrl + profileData?.profile_image} alt="" style={{width: '150px', height: '150px', borderRadius: '50%', marginTop : '8px'}} />
                </Col>
                </Row>
                <Col lg={8} md={10} sm={12} className="">
                  <div className={Style.application}>
                    <Form onSubmit={updateSubmit}>
                      {/* <button> */}

                      <input
                        type="file"
                        className="mt-2"
                        name="profile_image"
                        onChange={handleFileChange}
                      />
                      {/* </button> */}
                      {/* For Name and Category */}
                      <div className={Style.contactInstitute}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Name <span className="text-danger">*</span>
                          </Form.Label>

                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="name"
                            defaultValue={profileData.name}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Phone <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="number"
                            className={`${Style.inputField} ${Style.inputNumber}`}
                            name="phone"
                            onChange={handleChange}
                            defaultValue={profileData?.phone}
                          />
                        </Form.Group>
                      </div>

                      {/* For Email and Phone number */}
                      <div className={`${Style.contactInstitute}`}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Email <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="email"
                            className={`${Style.inputField} input`}
                            name="email"
                            onChange={handleChange}
                            defaultValue={profileData?.email}
                          />
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Blood Group <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Select
                            value={selectedBloodGroupOption}
                            onChange={handleBloodSelectChange}
                            aria-label="Default select example"
                            className={`${Style.inputField} ${Style.formSelect}`}
                          >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                          </Form.Select>
                        </Form.Group>
                      </div>

                      {/* For Degree Category and passig year  */}
                      <div className={`${Style.contactInstitute}`}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Degree Category{" "}
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Select
                            value={selectedDegreeCategoryOption}
                            onChange={handleDegreeCategorySelectChange}
                            aria-label="Default select example"
                            className={`${Style.inputField} ${Style.formSelect}`}
                          >
                            <option value="Honours">Honours</option>
                            <option value="Masters">Masters</option>
                            <option value="PhD">PhD</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            City <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="city"
                            onChange={handleChange}
                            defaultValue={profileData?.city}
                          />
                        </Form.Group>
                      </div>

                      {/* For Gender & Blood Group */}
                      <div className={`${Style.contactInstitute}`}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Gender <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Select
                            value={selectedGenderOption}
                            onChange={handleGenderSelectChange}
                            aria-label="Default select example"
                            className={`${Style.inputField} ${Style.formSelect}`}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Organization
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="organization"
                            onChange={handleChange}
                            defaultValue={profileData?.organization}
                          />
                        </Form.Group>
                      </div>

                      {/* For Country & City */}
                      <div className={Style.contactInstitute}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Country <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={`${Style.inputField} input`}
                            name="country"
                            onChange={handleChange}
                            defaultValue={profileData?.country}
                          />
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Designation
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="designation"
                            onChange={handleChange}
                            defaultValue={profileData?.designation}
                          />
                        </Form.Group>
                        
                      </div>

                      {/* Occupation & Organization */}
                      <div className={Style.contactInstitute}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Occupation <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="occupation"
                            onChange={handleChange}
                            defaultValue={profileData?.occupation}
                          />
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Website Link
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="web_link"
                            onChange={handleChange}
                            defaultValue={profileData?.web_link}
                          />
                        </Form.Group>
                      </div>

                      <Form.Group
                          className={`mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Academic Qualification
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            className={Style.inputField}
                            name="training"
                            onChange={handleChange}
                            defaultValue={profileData?.training}
                          />
                        </Form.Group>

                        <Form.Group
                          className={`mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Specific Areas of Expertise
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            className={Style.inputField}
                            name="expertise"
                            onChange={handleChange}
                            defaultValue={profileData?.expertise}
                          />
                        </Form.Group>

                      <Form.Group
                          className={`mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Affiliation
                          </Form.Label>
                          <Form.Control as="textarea" className={Style.inputField} name="affiliation"
                            onChange={handleChange}
                            defaultValue={profileData?.affiliation} rows={3} />
                        </Form.Group>

                      {/* Error Message  */}
                      {errorMessage && (
                        <>
                          <ul>
                            {Object.entries(errorMessage).map(
                              ([key, value], index) => (
                                <li key={index}>
                                  {Array.isArray(value) ? ( // Check if the property is an array
                                    <ul>
                                      {value.map((item, itemIndex) => (
                                        <li
                                          className="text-danger"
                                          key={itemIndex}
                                        >
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    value // Render as is for non-array properties
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </>
                      )}

                      {/* Submit button */}
                      {loadingBtn ? (
                        <div className="d-flex justify-content-center">
                          <Button disabled className={Style.submit}>
                            Inserting...
                          </Button>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center">
                          <Button type="submit" className={Style.submit}>
                            Submit
                          </Button>
                        </div>
                      )}
                    </Form>
                  </div>
                </Col>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
