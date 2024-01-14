CREATE TABLE IF NOT EXISTS Course_Offered (
    Course_ID VARCHAR(6) PRIMARY KEY,
    Employee_ID INT NOT NULL,
    Course_Name VARCHAR(255) NOT NULL,
    Course_Category VARCHAR(255) NOT NULL,
    Course_Duration VARCHAR(255) NOT NULL,
    Course_Capacity INT NOT NULL,
    Course_Schedule VARCHAR(255) NOT NULL,
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Course_Enrolled (
    Enrollment_ID VARCHAR(6) NOT NULL PRIMARY KEY,
    Course_ID VARCHAR(6) NOT NULL,
    Employee_ID INT NOT NULL,
    Start_Date DATE NOT NULL,
    End_Date DATE ,
    Grade INT ,
    FOREIGN KEY (Course_ID) REFERENCES Course_Offered(Course_ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Certificate (
    Certificate_ID VARCHAR(12) PRIMARY KEY,
    Employee_ID INT NOT NULL,
    Course_ID VARCHAR(6) NOT NULL,
    Release_Date DATE NOT NULL,
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Course_ID) REFERENCES Course_Offered(Course_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Instructor (
    Employee_ID INT NOT NULL,
    Course_ID VARCHAR(6) NOT NULL,
    PRIMARY KEY (Employee_ID, Course_ID),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Course_ID) REFERENCES Course_Offered(Course_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO Course_Offered (Course_ID, Employee_ID, Course_Name, Course_Category, Course_Duration, Course_Capacity, Course_Schedule) VALUES 
('JAV100', '20230008', 'Java Development Fundamentals', 'Technical Skills', '3 months (6 hours/week)', '15', 'MWF 10:00 AM - 12:00 PM'),
('ADV100', '20230010', 'Advanced Spring Framework', 'Technical Skills', '2.5 months (6 hours/week)', '15', 'TThSat 2:00 PM - 4:00 PM'),
('WEB100', '20230010', 'Web Development with Laravel Framework', 'Technical Skills', '3 months (6 hours/week)', '15', 'MWF 2:00 PM - 4:00 PM'),
('FRO100', '20230011', 'Frontend Essentials: HTML, CSS, and UI/UX Basics', 'Technical Skills', '2 months (6 hours/week)', '15', 'TThSat 7:00 PM - 9:00 PM'),
('PRO100', '20230008', 'Project Management', 'Technical Skills', '3 months (6 hours/week)', '15', 'MWF 4:00 PM - 6:00 PM'),
('STR100', '20230009', 'Stress Management and Work-Life Balance', 'Soft Skills', '2.5 months (6 hours/week)', '15', 'TThSat 4:00 PM - 6:00 PM'),
('YOG100', '20230011', 'Yoga and Mindfulness', 'Soft Skills', '3 months (6 hours/week)', '15', 'MWF 5:00 AM - 7:00 AM'),
('LEA100', '20230008', 'Leadership and Team Management', 'Soft Skills', '3 months (6 hours/week)', '15', 'TThSat 8:00 AM - 10:00 AM'),
('FIN100', '20230009', 'Financial Literacy: Investing and Personal Finance', 'Soft Skills', '2 months (6 hours/week)', '15', 'MWF 5:00 PM - 7:00 PM'),
('EFF100', '20230009', 'Effective Communication and Presentation Skills', 'Soft Skills', '2.5 months (6 hours/week)', '15', 'TThSat 5:00 PM - 7:00 PM');

INSERT INTO Course_Enrolled (Enrollment_ID, Course_ID, Employee_ID, Start_Date, End_Date, Grade) VALUES 
('EI101', 'JAV100', 20160001, '2023-02-15', '2023-05-15', 96),
('EI102', 'LEA100', 20170004, '2023-01-10', '2023-03-26', 88),
('EI103', 'FRO100', 20180006, '2023-03-01', '2023-04-30', 91),
('EI104', 'EFF100', 20170056, '2023-02-01', '2023-04-16', 95),
('EI105', 'FIN100', 20180025, '2023-03-15', '2023-05-15', 89),
('EI106', 'JAV100', 20190013, '2023-02-20', '2023-05-20', 94),
('EI107', 'WEB100', 20190014, '2023-03-05', '2023-06-05', 86),
('EI108', 'ADV100', 20230007, '2023-01-20', '2023-04-06', 92),
('EI109', 'PRO100', 20230012, '2023-03-10', '2023-06-10', 97),
('EI110', 'ADV100', 20220001, '2023-02-05', '2023-04-20', 87),
('EI111', 'YOG100', 20160002, '2023-01-15', '2023-04-15', 85),
('EI112', 'YOG100', 20160089, '2023-04-15', '2023-07-15', 90),
('EI113', 'YOG100', 20160091, '2023-07-15', '2023-10-15', 83),
('EI114', 'STR100', 20160092, '2023-01-15', '2023-04-01', 89),
('EI115', 'STR100', 20160093, '2023-04-01', '2023-06-15', 97),
('EI116', 'FRO100', 20160094, '2023-01-15', '2023-03-15', 86),
('EI117', 'FRO100', 20160095, '2023-04-01', '2023-06-01', 83),
('EI118', 'FIN100', 20170000, '2023-06-15', '2023-08-15', 98),
('EI119', 'LEA100', 20170001, '2023-11-15', '2024-02-15', 87),
('EI120', 'LEA100', 20170002, '2024-03-01', '2024-06-01', 80),
('EI121', 'FIN100', 20231001, '2023-09-01', '2023-11-01', 81),
('EI122', 'PRO100', 20231002, '2024-06-15', '2024-09-15', 97),
('EI123', 'JAV100', 20231003, '2024-10-01', '2024-01-01', 91),
('EI124', 'EFF100', 20231004, '2024-01-15', '2024-04-01', 70),
('EI125', 'EFF100', 20231005, '2024-04-15', '2024-07-01', 78),
('EI126', 'EFF100', 20231006, '2024-07-15', '2024-10-01', 89),
('EI127', 'STR100', 20231007, '2023-06-15', '2023-09-01', 93),
('EI128', 'YOG100', 20231008, '2023-10-15', '2024-01-15', 94),
('EI129', 'WEB100', 20231009, '2024-01-15', '2024-04-15', 79),
('EI130', 'YOG100', 20231010, '2024-01-15', '2024-04-15', 88);

INSERT INTO Certificate (Certificate_ID, Employee_ID, Course_ID, Release_Date) VALUES 
('JAV100160001', 20160001, 'JAV100', '2023-05-15'),
('LEA100170004', 20170004, 'LEA100', '2023-03-26'),
('FRO100180006', 20180006, 'FRO100', '2023-04-30'),
('EFF100170056', 20170056, 'EFF100', '2023-04-16'),
('FIN100180025', 20180025, 'FIN100', '2023-05-15'),
('JAV100190013', 20190013, 'JAV100', '2023-05-20'),
('WEB100190014', 20190014, 'WEB100', '2023-06-05'),
('ADV100230007', 20230007, 'ADV100', '2023-04-06'),
('PRO100230012', 20230012, 'PRO100', '2023-06-10'),
('ADV100220001', 20220001, 'ADV100', '2023-04-20'),
('YOG100160002', 20160002, 'YOG100', '2023-04-15'),
('YOG100160089', 20160089, 'YOG100', '2023-07-15'),
('YOG100160091', 20160091, 'YOG100', '2023-10-15'),
('STR100160092', 20160092, 'STR100', '2023-04-01'),
('STR100160093', 20160093, 'STR100', '2023-06-15'),
('FRO100160094', 20160094, 'FRO100', '2023-03-15'),
('FRO100160095', 20160095, 'FRO100', '2023-06-01'),
('FIN100170000', 20170000, 'FIN100', '2023-11-01'),
('LEA100170001', 20170001, 'LEA100', '2024-02-15'),
('LEA100170002', 20170002, 'LEA100', '2024-06-01'),
('FIN100231001', 20231001, 'FIN100', '2023-11-01'),
('PRO100231002', 20231002, 'PRO100', '2024-09-15'),
('JAV100231003', 20231003, 'JAV100', '2024-01-01'),
('EFF100231004', 20231004, 'EFF100', '2024-04-01'),
('EFF100231005', 20231005, 'EFF100', '2024-07-01'),
('EFF100231006', 20231006, 'EFF100', '2024-10-01'),
('STR100231007', 20231007, 'STR100', '2023-09-01'),
('YOG100231008', 20231008, 'YOG100', '2024-01-15'),
('WEB100231009', 20231009, 'WEB100', '2024-04-15'),
('YOG100231010', 20231010, 'YOG100', '2024-04-15');


INSERT INTO Instructor (Employee_ID, Course_ID) VALUES 
(20230008, 'PRO100'),
(20231034, 'LEA100'),
(20230009, 'FIN100'),
(20230008, 'EFF100'),
(20231034, 'JAV100'),
(20230010, 'ADV100'),
(20230010, 'WEB100'),
(20230011, 'FRO100'),
(20230011, 'YOG100'),
(20230009, 'STR100');

DELIMITER //
CREATE FUNCTION `generateEnrollmentID`()
RETURNS VARCHAR(20) DETERMINISTIC
BEGIN
    DECLARE lastEnrollmentID VARCHAR(20);
    DECLARE lastInt INT;
    DECLARE newInt INT;
    DECLARE newEnrollmentID VARCHAR(20);

    -- Get the maximum Enrollment_ID
    SELECT MAX(Enrollment_ID) INTO lastEnrollmentID FROM Course_Enrolled;

    -- Extract the integer part from the Enrollment_ID
    SET lastInt = CAST(SUBSTRING(lastEnrollmentID, 3) AS UNSIGNED);

    -- Increment the integer by 1
    SET newInt = lastInt + 1;

    -- Generate a new Enrollment_ID with the incremented integer
    SET newEnrollmentID = CONCAT('EI', newInt);

    RETURN newEnrollmentID;
END//




DELIMITER ;
