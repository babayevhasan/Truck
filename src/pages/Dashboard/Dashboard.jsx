
// import React from "react";
// import Header from "../FreightAnnouncements/Header";
// import StatusChart from "../../components/ui/Modal/Chart/StatusChart";
// import freightData from "../FreightAnnouncements/freightData.json";
// import styles from "./Dashboard.module.css";

// const Dashboard = () => {
//   return (
//     <>
//       <Header />
//       <div style={{ padding: "20px" }}>
//         <h2 style={{ marginBottom: "20px" }}>İlanların Status Dağılımı</h2>
//         <StatusChart data={freightData} />
//       </div>
//     </>
//   );
// };

// export default Dashboard;


import React from "react";
import Header from "../FreightAnnouncements/Header";
import StatusChart from "../../components/ui/Modal/Chart/StatusChart";
import freightData from "../FreightAnnouncements/freightData.json";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <>
      <Header />
      <main className={styles.dashboard}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Elanların status sayı</h2>
          <StatusChart data={freightData} />
        </section>
      </main>
    </>
  );
};

export default Dashboard;
