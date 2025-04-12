/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { db } from "lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";

const Item = ({ name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDBox lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  </MDBox>
);

Item.propTypes = {
  name: PropTypes.string,
};

function Bookings() {
  const columns = [
    { Header: "Item", accessor: "name", width: "45%", align: "center" },
    { Header: "Price", accessor: "price", width: "45%", align: "center" },
  ];

  const formatMenu = (menu) => {
    return menu.map((day) => {
      const updated = {};

      for (const key in day) {
        updated[key] = day[key].map((item) => <Item name={item.item} key={key} />);
      }
      return day;
    });
  };

  const [rows, setRows] = useState(null);
  useEffect(() => {
    const getMenu = async () => {
      const menuRef = doc(db, "config", "menu");
      const snap = await getDoc(menuRef);

      if (snap.exists()) {
        console.log(snap.data());
        setRows(snap.data());
      }
    };
    getMenu();
  }, []);
  const [day, setDay] = useState(new Date().getDay());

  const handleDay = (event, newDay) => {
    setDay(newDay);
  };

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  };

  if (rows === null) {
    return;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} mt={5}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h4" color="white">
                  Breakfast
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: rows["breakFast"] }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} mt={5}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h4" color="white">
                  Lunch
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: rows["lunch"] }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} mt={5}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h4" color="white">
                  Dinner
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: rows["dinner"] }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Bookings;
