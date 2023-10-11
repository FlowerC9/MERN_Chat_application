import React from 'react';

const NotificationBadge = ({ count }) => {
    return (
        <div className={`notification-badge ${count > 0 ? 'active' : ''}`}>
            {count}
        </div>
    );
};

export default NotificationBadge;