import { useEffect, useState } from "react";
import myData from "/src/psychologists.json";
import { ref, onValue } from "firebase/database";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    const dataRef = ref(myData, "psychologists");

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const psychologistsArray = Object.values(data);
        setPsychologists(psychologistsArray);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>List of Psychologists</h2>
      <ul>
        {psychologists.map((psych, index) => (
          <li key={index}>
            <h3>{psych.name}</h3>
            <p>{psych.name}</p>
            <p>{psych.experience} years of experience</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Psychologists;
