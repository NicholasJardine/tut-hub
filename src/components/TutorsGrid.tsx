import React from "react";
import { useEffect,useState } from "react";

type Tutor = {
    full_name: string;
    email: string;
};

const TutorsGrid: React.FC = () => {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchTutors = async () => {
            try {
                const response = await fetch('/api/alltutors');
                const data = await response.json();
                if (response.ok) {
                  setTutors(data.tutors); // Set tutors to the fetched data
                } else {
                  setError(data.message || 'Error fetching tutors');
                }
              } catch (err) {
                setError('An error occurred while fetching tutors');
              } finally {
                setLoading(false); // Turn off loading when done
              }
        };

        fetchTutors();
    }, []

    );

    return(
        <div className="container mx-auto p-4">
            {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {tutors.map((tutor, index) => (
            <div key={index} className="p-4 border rounded shadow-md">
              <h2 className="text-lg font-semibold">{tutor.full_name}</h2>
              <p>{tutor.email}</p>
            </div>
          ))}
        </div>
    )

}
</div>
    );
};

export default TutorsGrid