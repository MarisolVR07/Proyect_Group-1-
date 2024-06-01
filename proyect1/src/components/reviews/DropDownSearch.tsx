
import DropdownMenu from "@/components/reviews/DropDownMenuSearch";
import { useAppliedSelfAssessmentsStore } from "@/store/appliedSelfAssessmentStore";

const App = () => {
   
    const { getAppliedSelfAssessmentsByDepartment, setAppliedSelfAssessments } = useAppliedSelfAssessmentsStore();

    const handleSearch = async (departmentId) => {
        console.log(`Buscar o filtrar por: ${departmentId}`);
        const filteredSelfAssessments = await getAppliedSelfAssessmentsByDepartment(departmentId);
        if (!("error" in filteredSelfAssessments)) {
            setAppliedSelfAssessments(filteredSelfAssessments);
        } else {
            console.error("Error fetching filtered assessments:", filteredSelfAssessments.error);
        }
    };

    return (
        <div className="App">
            <DropdownMenu onSearch={handleSearch} />
        </div>
    );
};

export default App;