import {useState} from "react";

function useLeagueService() {
    const [loading, setLoading] = useState<boolean>(false);

    async function getLeagues() {
        return;
    }

    return {
        loading,
        getLeagues,
    }
}

export default useLeagueService;