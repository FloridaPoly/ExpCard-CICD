import React, { useState } from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { useData } from '@ellucian/experience-extension-utils';
import PropTypes from 'prop-types';

const styles = () => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    }
});

const MannyCardCard = ({ classes }) => {
    const { authenticatedEthosFetch } = useData();
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        setError(null);
        try {
            const response = await authenticatedEthosFetch("manny-test-pipeline", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ manny: "test" })
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Response data:", data);
                setResponseData(data);
            } else {
                const errMsg = `Fetch failed with status: ${response.status}`;
                console.error(errMsg);
                setError(errMsg);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message || "Unknown fetch error");
        }
    };

    console.log("Rendered responseData:", responseData);

    return (
        <div className={classes.card}>
            <p>test pipeline</p>
            <button onClick={handleClick}>Call Pipeline</button>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {responseData ? (
                <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", backgroundColor: "#eee", padding: 10 }}>
                    {JSON.stringify(responseData, null, 2)}
                </pre>
            ) : (
                <p>No data fetched yet.</p>
            )}
        </div>
    );
};

MannyCardCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MannyCardCard);