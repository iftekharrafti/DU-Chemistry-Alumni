import CardDesign from "@/components/cardDesign/CardDesign";
import MemberSkeleton from "@/components/loader/MemberSkeleton";
import { BASE_URL } from "@/utils/api";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

const SearchResults = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
  const router = useRouter();
  const { search } = router.query;

  useEffect(() => {
    setLoading(true)
    axios
      .get(BASE_URL + `/membersearch?search=${search}`)
      .then((response) => {
        setLoading(false)
        setData(response?.data?.data?.data);
        console.log(response)
      });
  }, [search, router]);

  return (
    <div>
      {loading ? (
          <MemberSkeleton />
        ) : (
          <>
            {/* General Member Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">Search Member</h3>
            </div>
            {/* General Member Details */}
            <Container className="">
                {data?.length === 0 && <h4>No Data Found</h4>}
              <Row>
                {data?.map((item) => (
                  <CardDesign key={item.id} item={item} />
                ))}
              </Row>
            </Container>
          </>
        )}
    </div>
  );
};

export default SearchResults;
