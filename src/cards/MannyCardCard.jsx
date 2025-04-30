import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
// import { Typography, TextLink } from '@ellucian/react-design-system/core';
import { useCardInfo, useData } from '@ellucian/experience-extension-utils';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

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
    useCardInfo();
    const handleClick = async () => {
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
                setResponseData(data);
            } else {
                console.error("Fetch failed with status:", response.status);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <div className={classes.card}>
            <button onClick={handleClick}>Call Pipeline</button>
            {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
        </div>
    );
};

MannyCardCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MannyCardCard);