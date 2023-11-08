import Head from "next/head";

import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Style from "@/styles/application.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Application() {
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState("Member");
  const [selectedDegreeCategoryOption, setSelectedDegreeCategoryOption] =
    useState("Honours");
  const [selectedGenderOption, setSelectedGenderOption] = useState("Male");
  const [selectedBloodGroupOption, setSelectedBloodGroupOption] =
    useState("A+");
  const [isValid, setIsValid] = useState(true);
  const [isPasswordSimilar, setIsPasswordSimilar] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [errorMessage, setErrorMessage] = useState({});
  const [category, setCategory] = useState([]);
  const [errorCertificateSize, setErrorCertificateSize] = useState(true);
  const [errorProfileFileSize, setErrorProfileFileSize] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: dataAdmin } = useFetch("/home");
  
  useEffect(() => {
    axios.get(BASE_URL + "/member_category").then((res) => {
      setCategory(res.data.data);
      console.log(res)
    });
  },[])

  const handleDegreeCategorySelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDegreeCategoryOption(selectedValue);
  };

  const handleCategorySelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategoryOption(selectedValue);
  };

  const handleGenderSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedGenderOption(selectedValue);
  };

  const handleBloodSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedBloodGroupOption(selectedValue);
  };

  // Password hide and show
  const showHidePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const showHideConfirmPassword = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleCertificateChange = (e) => {
    console.log("handleCertificateChange function called"); // Check if the function is being called

    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile); // Check if the selected file is received

    // Rest of your code
  };

  const onSubmit = async (data) => {
    try {
      setLoadingBtn(true);
      data.admin_name = await dataAdmin?.admin?.admin_name;
      data.category = selectedCategoryOption;
      data.degree_category = selectedDegreeCategoryOption;
      data.gender = selectedGenderOption;
      data.blood = selectedBloodGroupOption;
      const profile_image = data.profile_image[0];
      const certificate_image = data.certificate_image[0];
      const formData = new FormData();

      if (certificate_image) {
        const sizeInBytes = certificate_image.size;
        const sizeInKb = sizeInBytes / 1024;
        if (sizeInKb > 400) {
          setErrorCertificateSize(false);
          setLoadingBtn(false);
          setErrorMessage({})
          return;
        }
        setErrorCertificateSize(true)
      }

      if (profile_image) {
        const sizeInBytes = profile_image.size;
        const sizeInKb = sizeInBytes / 1024;
        if (sizeInKb > 400) {
          setErrorProfileFileSize(false);
          setLoadingBtn(false);
          setErrorMessage({})
          return;
        }
        setErrorProfileFileSize(true);
      }

      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("member_password", data.member_password);
      formData.append("degree_category", data.degree_category);
      formData.append("passing_year", data.passing_year);
      formData.append("certificate_image", certificate_image);
      formData.append("profile_image", profile_image);
      formData.append("gender", data.gender);
      formData.append("blood", data.blood);
      formData.append("country", data.country);
      formData.append("city", data.city);
      formData.append("occupation", data.occupation);
      formData.append("organization", data.organization);
      formData.append("designation", data.designation);

      if (data.member_password !== data.confirm_password) {
        setIsPasswordSimilar(false);
        setLoadingBtn(false);
      } else {
        setIsPasswordSimilar(true);
      }

      const response = await axios({
        method: "post",
        url: BASE_URL + "/application_memebr",
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      });

      if (response.data.status === 700) {
        setLoadingBtn(false);
        setErrorMessage(response.data.message);
        toast.error(response.data.message);
        setErrorProfileFileSize(true);
        setErrorCertificateSize(true);
      } else if (response.data.status === 600) {
        setLoadingBtn(false);
        setErrorProfileFileSize(true);
        setErrorCertificateSize(true);
        setErrorMessage(response.data.message);
        toast.error(response.data.message);
      } else if (response.data.status === 200) {
        Swal.fire(
          "Congratulations!",
          "Registration Successful. Please, verify your email.",
          "success"
        );
        setErrorMessage({});
        toast.success("Registration Successful");
        setLoadingBtn(false);
        setErrorProfileFileSize(true);
        setErrorCertificateSize(true);
        setErrorMessage({});

        setIsPasswordSimilar(true);
        reset();
      } else {
        toast.error("Something went wrong");
        setLoadingBtn(false);
      }
    } catch (error) {
      console.error(error);
      setLoadingBtn(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          Application:: Dhaka UNiversity Chemistry Alumni Association Application Form
        </title>
        <meta name="description" content="Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main style={{ background: "#EDF0F2" }}>
        <>
          <div className="headerTitle">
            <h3 class="headerTitleMain"> APPLICATION FORM</h3>
          </div>
          {/* Member Application Form */}
          <Container className="pb-4">
            <Row>
              <Col lg={8} md={10} sm={12} className="mx-auto">
                <div className={Style.application}>
                  <Form onSubmit={handleSubmit(onSubmit)}>
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
                          {...register("name", { required: true })}
                          placeholder="Name"
                        />
                        {errors.name && (
                          <span className="text-danger">Name is required</span>
                        )}
                      </Form.Group>
                      <Form.Group
                        className={`${Style.institute} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Category <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          value={selectedCategoryOption}
                          onChange={handleCategorySelectChange}
                          aria-label="Default select example"
                          className={`${Style.inputField} ${Style.formSelect}`}
                        >
                          {
                            category?.map((item) => <option key={item.id} value={item?.id}>{item?.category}</option>)
                          }
                          {/* <option value="Member">Member</option>
                          <option value="Life_Member">Life_Member</option> */}
                        </Form.Select>
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
                          {...register("email", { required: true })}
                          placeholder="Email"
                        />
                        {errors.email && (
                          <span className="text-danger">Email is required</span>
                        )}
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
                          {...register("phone", { required: true })}
                          placeholder="Enter phone with country code"
                        />
                        {errors.phone && (
                          <span className="text-danger">
                            Phone Number is required
                          </span>
                        )}
                        {!isValid && (
                          <span className="text-danger">
                            This number is not valid
                          </span>
                        )}
                      </Form.Group>
                    </div>

                    {/* For Member password and confirm password */}
                    <div className={`${Style.contactInstitute}`}>
                      <Form.Group
                        className={`${Style.contact} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Member Password <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            size="sm"
                            type={isPasswordVisible ? "text" : "password"}
                            className={`${Style.inputField} input`}
                            {...register("member_password", { required: true })}
                            placeholder="Member Password"
                          />
                          {isPasswordVisible ? (
                            <span className={Style.passwordIconDiv}>
                              <AiOutlineEye
                                className={Style.passwordIcon}
                                onClick={showHidePassword}
                              />
                            </span>
                          ) : (
                            <span className={Style.passwordIconDiv}>
                              <AiOutlineEyeInvisible
                                className={Style.passwordIcon}
                                onClick={showHidePassword}
                              />
                            </span>
                          )}
                        </div>
                        {errors.member_password && (
                          <span className="text-danger">
                            Member Password is required.
                          </span>
                        )}
                      </Form.Group>
                      <Form.Group
                        className={`${Style.institute} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Confirm Password{" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            size="sm"
                            type={
                              isConfirmPasswordVisible ? "text" : "password"
                            }
                            className={`${Style.inputField} input`}
                            {...register("confirm_password", {
                              required: true,
                            })}
                            placeholder="Confirm Password"
                          />
                          {isConfirmPasswordVisible ? (
                            <span className={Style.passwordIconDiv}>
                              <AiOutlineEye
                                className={Style.passwordIcon}
                                onClick={showHideConfirmPassword}
                              />
                            </span>
                          ) : (
                            <span className={Style.passwordIconDiv}>
                              <AiOutlineEyeInvisible
                                className={Style.passwordIcon}
                                onClick={showHideConfirmPassword}
                              />
                            </span>
                          )}
                        </div>
                        {errors.confirm_password && (
                          <span className="text-danger">
                            Member Password is required
                          </span>
                        )}
                        {!isPasswordSimilar && (
                          <span className="text-danger">
                            This Password are not similar
                          </span>
                        )}
                      </Form.Group>
                    </div>

                    {/* For Degree Category and passig year  */}
                    <div className={`${Style.contactInstitute}`}>
                      <Form.Group
                        className={`${Style.contact} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Degree Category <span className="text-danger">*</span>
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
                          Passing Year <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="number"
                          className={`${Style.inputField}  ${Style.inputNumber} input`}
                          {...register("passing_year", { required: true })}
                          placeholder="Passing Year"
                        />
                        {errors.passing_year && (
                          <span className="text-danger">
                            Passing Year is required
                          </span>
                        )}
                      </Form.Group>
                    </div>

                    {/* For Certificate image & Profile image */}
                    <div className={`${Style.contactInstitute}`}>
                      <Form.Group
                        className={`${Style.contact} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Highest Educational Certificate from DU (Image/pdf Max 500kb){" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="file"
                          className={`${Style.inputField} input`}
                          onChange={handleCertificateChange}
                          {...register("certificate_image", { required: true })}
                        />

                        {errors.certificate_image && (
                          <span className="text-danger">
                            Certificate Image is required
                          </span>
                        )}
                      </Form.Group>
                      <Form.Group
                        className={`${Style.institute} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Profile Image(300*300px){" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="file"
                          className={`${Style.inputField} input`}
                          {...register("profile_image", { required: true })}
                        />

                        {errors.profile_image && (
                          <span className="text-danger">
                            Profile Image is required
                          </span>
                        )}
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

                    {/* For Country & City */}
                    <div className={Style.contactInstitute}>
                      <Form.Group
                        className={`${Style.contact} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Country of Residence{" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          className={`${Style.inputField} input`}
                          {...register("country", { required: true })}
                          placeholder="Country"
                        />
                        {errors.country && (
                          <span className="text-danger">
                            Country is required
                          </span>
                        )}
                      </Form.Group>
                      <Form.Group
                        className={`${Style.institute} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          City of Residence{" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          className={Style.inputField}
                          {...register("city", { required: true })}
                          placeholder="City"
                        />
                        {errors.city && (
                          <span className="text-danger">City is required</span>
                        )}
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
                          {...register("occupation", { required: true })}
                          placeholder="Occupation"
                        />
                        {errors.occupation && (
                          <span className="text-danger">
                            Occupation is required
                          </span>
                        )}
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
                          {...register("organization")}
                          placeholder="Organization"
                        />
                      </Form.Group>
                    </div>

                    {/* Designation */}
                    <div className={Style.contactInstitute}>
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
                          {...register("designation")}
                          placeholder="Designation"
                        />
                      </Form.Group>
                    </div>

                    {/* Error Message  */}
                    {!errorProfileFileSize && (
                      <>
                      <span className="text-danger">
                        Profile Size maximum 400kb
                      </span>
                      <br />
                      </>
                    )}
                    {!errorCertificateSize && (
                      <span className="text-danger">
                        Certificate Size maximum 400kb
                      </span>
                    )}
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
            </Row>
          </Container>
        </>
      </main>
    </>
  );
}
