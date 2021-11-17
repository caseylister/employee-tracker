-- insert into table values

INSERT INTO departments (name)
VALUES
    ('Executive'),
    ('Finance'),
    ('Marketing'),
    ('Sales'),
    ('IT');


INSERT INTO roles (title, salary, department_id)
VALUES
    ('CEO', 1000000, 1),
    ('CFO', 700000, 1),
    ('COO', 700000, 1),
    ('CMO', 650000, 1),
    ('CTO', 650,000, 1),
    ('Senior Accountant', 325000, 2),
    ('Staff Accountant', 225000, 2),
    ('Accounts Payable Clerk', 125000, 2),
    ('Accounts Receivable Clerk', 125000, 2),
    ('Marketing Manager', 110000, 3),
    ('Marketing Specialist', 100000, 3),
    ('Marketing Associate', 90000, 3),
    ('Sales Manager', 110000, 4),
    ('Sales Specialist', 100000, 4),
    ('Sales Representatives', 95000, 4),
    ('Customer Service Rep', 90000, 4),
    ('IT Manager', 120000, 5),
    ('Senior Web Developer', 110000, 5),
    ('Junior Web Developer', 100000, 5);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Bob', 'Rob', 1, NULL)
    ('Lenny', 'Chalamet', 2, 1),
    ('Rebecca', 'Finesworth', 3, 1),
    ('Sydney', 'Simmons', 4, 1),
    ('Bryce', 'Fall', 5, 1),
    ('John', 'Schumbacker', 6, 2),
    ('Gerrit', 'Mason', 7, 6),
    ('Johnny', 'Lou', 8, 6),
    ('Jamie', 'Smith', 8, 6),
    ('Renee', 'Linus', 9, 6),
    ('Tyler', 'Hayes', 9, 6),
    ('Juliet', 'Tuthill', 10, 4),
    ('Chloe', 'Richards', 11, 10),
    ('Diana', 'Garcia', 12, 10),
    ('Michael', 'Roberts', 12, 10),
    ('Brian', 'Matthews', 13, 3),
    ('Maria', 'Perez', 14, 13),
    ('David', 'Powers', 15, 13),
    ('Theresa', 'Williams', 15, 13),
    ('Jodie', 'Johnson', 15, 13),
    ('Mark', 'Miller', 15, 13),
    ('Kayla', 'Thompson', 16, 13),
    ('Cole', 'Bennett', 16, 13),
    ('Mason', 'Cunningham', 16, 13),
    ('Taylor', 'Campbell', 16, 13),
    ('Casey', 'King', 17, 5),
    ('Sarah', 'Evans', 18, 17),
    ('Austin', 'Davis', 19, 17);