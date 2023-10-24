import Head from "next/head";
import { Inter } from "next/font/google";
import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Style from "../styles/Application.module.css";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function Application() {
  const [selectedCategoryOption, setSelectedCategoryOption] = useState("");
  const [selectedGenderOption, setSelectedGenderOption] = useState("");
  const [selectedBloodGroupOption, setSelectedBloodGroupOption] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isPasswordSimilar, setIsPasswordSimilar] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isErrorPhone, setIsErrorPhone] = useState(true);

  const arr = [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: dataAdmin } = useFetch("/home");

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

  const onSubmit = async (data) => {
    try {
      setLoadingBtn(true);
      data.admin_name = await dataAdmin?.admin?.admin_name;
      data.category = selectedCategoryOption;
      data.gender = selectedGenderOption;
      data.blood = selectedBloodGroupOption;
      const profile_image = data.profile_image[0];
      const certificate_image = data.certificate_image[0];
      const formData = new FormData();
    //   console.log(data);

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
      }

      const response = await axios({
        method: "post",
        url: BASE_URL + "/application_memebr",
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      });
      console.log(response);
      //toast.success("Registration Successful");
      setLoadingBtn(false);
      //reset();
      if(response.data.status === 700){
        // Object.keys(response.data.errors).map(item => arr.push(item));
        console.log(response.data.errors.phone);
        setIsErrorPhone(false);
      }
    } catch (error) {
      console.error(error);
      setLoadingBtn(false);
    }
  };
  console.log(arr);

  return (
    <>
      <Head>
        <title>Application::</title>
        <meta name="description" content="Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        <>
          <div className="headerTitle">
            <h3 class="headerTitleMain"> APPLICATION FORM</h3>
          </div>
          {/* Member Application Form */}
          <Container className="mb-5">
            <Row>
              <Col lg={8} md={10} sm={12} className="mx-auto">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* For Name and Category */}
                  <div className={Style.contactInstitute}>
                    <Form.Group
                      className={`${Style.contact} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>Name</Form.Label>
                      <Form.Control
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
                        Category
                      </Form.Label>
                      <Form.Select
                        value={selectedCategoryOption}
                        onChange={handleCategorySelectChange}
                        aria-label="Default select example"
                        className={Style.inputField}
                      >
                        <option>Select Category</option>
                        <option value="Member">Member</option>
                        <option value="Life_Member">Life_Member</option>
                      </Form.Select>
                    </Form.Group>
                  </div>

                  {/* For Email and number */}
                  <div className={`${Style.contactInstitute}`}>
                    <Form.Group
                      className={`${Style.contact} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>
                        Email
                      </Form.Label>
                      <Form.Control
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
                        Phone
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className={`${Style.inputField} ${Style.inputNumber}`}
                        {...register("phone", { required: true })}
                        placeholder="Phone"
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

                  {/* For Member password and degree category */}
                  <div className={`${Style.contactInstitute}`}>
                    <Form.Group
                      className={`${Style.contact} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>
                        Member Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        className={`${Style.inputField} input`}
                        {...register("member_password", { required: true })}
                        placeholder="Member Password"
                      />
                      {errors.member_password && (
                        <span className="text-danger">
                          Member Password is required
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group
                      className={`${Style.institute} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        className={`${Style.inputField} input`}
                        {...register("confirm_password", { required: true })}
                        placeholder="Confirm Password"
                      />
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

                  {/* For passig year and certificate image */}
                  <div className={`${Style.contactInstitute}`}>
                    <Form.Group
                      className={`${Style.contact} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>
                        Degree Category
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={`${Style.inputField}`}
                        {...register("degree_category", { required: true })}
                        placeholder="Degree Category"
                      />
                      {errors.degree_category && (
                        <span className="text-danger">
                          Degree Category is required
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group
                      className={`${Style.institute} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>
                        Passing Year
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className={`${Style.inputField} input`}
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

                  {/* For Profile image and gender */}
                  <div className={`${Style.contactInstitute}`}>
                    <Form.Group
                      className={`${Style.contact} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>
                        Certificate Image(300*300px)
                      </Form.Label>
                      <Form.Control
                        type="file"
                        className={`${Style.inputField} input`}
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
                        Profile Image(300*300px)
                      </Form.Label>
                      <Form.Control
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

                  {/* For Blood Group and country */}
                  <div className={`${Style.contactInstitute}`}>
                    <Form.Group
                      className={`${Style.contact} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>
                        Gender
                      </Form.Label>
                      <Form.Select
                        value={selectedGenderOption}
                        onChange={handleGenderSelectChange}
                        aria-label="Default select example"
                        className={Style.inputField}
                      >
                        <option>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group
                      className={`${Style.institute} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>
                        Blood Group
                      </Form.Label>
                      <Form.Select
                        value={selectedBloodGroupOption}
                        onChange={handleBloodSelectChange}
                        aria-label="Default select example"
                        className={Style.inputField}
                      >
                        <option>Select Blood Group</option>
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

                  {/* For City and Occupation */}
                  <div className={Style.contactInstitute}>
                    <Form.Group
                      className={`${Style.contact} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>
                        Country
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={`${Style.inputField} input`}
                        {...register("country", { required: true })}
                        placeholder="Country"
                      />
                      {errors.country && (
                        <span className="text-danger">Country is required</span>
                      )}
                    </Form.Group>
                    <Form.Group
                      className={`${Style.institute} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>City</Form.Label>
                      <Form.Control
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
                  {/* Organization and Designation */}
                  <div className={Style.contactInstitute}>
                    <Form.Group
                      className={`${Style.contact} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>
                        Occupation
                      </Form.Label>
                      <Form.Control
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
                        type="text"
                        className={Style.inputField}
                        {...register("organization")}
                        placeholder="Organization"
                      />
                    </Form.Group>
                  </div>
                  <div className={Style.contactInstitute}>
                    <Form.Group
                      className={`${Style.institute} mb-3`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Style.inputLabel}>
                        Designation
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={Style.inputField}
                        {...register("designation")}
                        placeholder="Designation"
                      />
                    </Form.Group>
                  </div>
                  {
                    !isErrorPhone && <p className="text-danger">Phone or Email already been taken</p>
                  }

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
              </Col>
            </Row>
          </Container>
        </>
      </main>
    </>
  );
}
