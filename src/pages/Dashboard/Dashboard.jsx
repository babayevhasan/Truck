
// import React from "react";
// import Header from "../FreightAnnouncements/Header";
// import StatusChart from "../../components/ui/Modal/Chart/StatusChart";
// import freightData from "../FreightAnnouncements/freightData.json";
// import styles from "./Dashboard.module.css";

// const Dashboard = () => {
//   return (
//     <>
//       <Header />
//       <main className={styles.dashboard}>
//         <section className={styles.card}>
//           <h2 className={styles.cardTitle}>Elanların status sayı</h2>
//           <StatusChart data={freightData} />
//         </section>
//       </main>
//     </>
//   );
// };

// export default Dashboard;


import React from "react";
import Header from "../FreightAnnouncements/Header";
import StatusChart from "../../components/ui/Modal/Chart/StatusChart";
import TypeChart from "../../components/ui/Modal/Chart/TypeChart";
import freightData from "../FreightAnnouncements/freightData.json";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <>
      <Header />
      <main className={styles.dashboard}>
        <h2 className={styles.title}>Elanların statistikası</h2>
        <div className={styles.chartsContainer}>
          <section className={styles.card}>
            <h3 className={styles.chartTitle}>Status statistikası</h3>
            <StatusChart data={freightData} />
          </section>
          <section className={styles.card}>
            <h3 className={styles.chartTitle}>Növ statistikası</h3>
            <TypeChart data={freightData} />
          </section>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
