CREATE TABLE redirects (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    redirect VARCHAR(2048) NOT NULL,
    reason VARCHAR(255),
    created_on TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE visitors (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    redirect_id VARCHAR(36) NOT NULL,
    browser JSON,
    fingerprint JSON,
    headers JSON NOT NULL,
    geo JSON,
    ip_addr INET NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW()
);