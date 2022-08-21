import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import { modules } from "./modules";
import Styles from "./sections.module.css";
import TabPanel from "./tab-panel/tab-panel";
import { a11yProps } from "./utils/a-11y-props";

const Sections = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <section className={Styles.container}>
      <Box sx={{ bgcolor: "background.paper" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            {modules.map((module, index) => (
              <Tab key={`module_${module.label}`} label={t(module.label)} {...a11yProps(index)} />
            ))}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {modules.map((module, index) => (
            <TabPanel
              key={`module_component_${module.label}`}
              value={value}
              index={index}
              dir={theme.direction}
            >
              {module.component}
            </TabPanel>
          ))}
        </SwipeableViews>
      </Box>
    </section>
  );
};

export default Sections;
