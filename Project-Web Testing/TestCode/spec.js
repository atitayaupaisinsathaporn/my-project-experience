describe('CS262_TeamProject',  function(){
    browser.manage().window().maximize();

    it('TC1: Should alert text กรุณากรอกข้อมูลเพิ่ม / ถอน อย่างน้อย 1 รายการ',async () => { 
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:8080/');
        browser.sleep(1000);

        await element(by.id('studentTitle')).all(by.css('option[value="นาง"]')).click();
        await element(by.id('studentFirstName')).sendKeys("สรรพวิชช์");
        await element(by.id('studentId')).sendKeys("6409610786");
        await element(by.id('studentYear')).sendKeys("3");
        await element(by.id('studyField')).sendKeys("วิทย์คอม");
        await element(by.id('advisorName')).sendKeys("ทรงสัก สโมสร");
        await element(by.id('cause')).sendKeys("อยากเรียนอะ");
        await element(by.id('addressNumber')).sendKeys("262");
        await element(by.id('moo')).sendKeys("1");
        await element(by.id('tumbol')).sendKeys("ท่าข้าม");
        await element(by.id('amphur')).sendKeys("บางขุนเทียน");
        await element(by.id('province')).sendKeys("กรุงเทพ");
        await element(by.id('postalCode')).sendKeys("10150");
        await element(by.id('mobilePhone')).sendKeys("0922798613");
        await element(by.id('phone')).sendKeys("0123456789");
        await element(by.buttonText('Submit')).click();
        browser.sleep(1000);
        
        const alert = await browser.switchTo().alert();
        const alertText = await alert.getText();
        await expect(alertText).toEqual("กรุณากรอกข้อมูลเพิ่ม / ถอน อย่างน้อย 1 รายการ");
        await alert.accept();
        browser.sleep(1000);
    });
    
    it('TC2: Shouldnt  submit when user กรอกไม่ตรง format',async function()  { 
        await browser.driver.navigate().refresh();
        await element(by.id('studentTitle')).all(by.css('option[value="นาง"]')).click();
        await element(by.id('studentFirstName')).sendKeys("สรรพวิชช์");
        await  element(by.id('studentLastName')).sendKeys("ช่องดารากุล");
        await element(by.id('studentId')).sendKeys("6");
        await element(by.id('studentYear')).sendKeys("3");
        await element(by.id('studyField')).sendKeys("วิทย์คอม");
        await element(by.id('advisorName')).sendKeys("ทรงสัก สโมสร");
        await element(by.id('cause')).sendKeys("อยากเรียนอะ");
        await element(by.id('addressNumber')).sendKeys("262");
        await element(by.id('moo')).sendKeys("1");
        await element(by.id('tumbol')).sendKeys("ท่าข้าม");
        await element(by.id('amphur')).sendKeys("บางขุนเทียน");
        await element(by.id('province')).sendKeys("กรุงเทพ");
        await element(by.id('postalCode')).sendKeys("1");
        await element(by.id('mobilePhone')).sendKeys("0");
        await element(by.id('phone')).sendKeys("0");
        await element(by.buttonText('Submit')).click();
        
        const alert = await browser.switchTo().alert();
        await alert.accept();
        
        browser.sleep(1000);
        
    });

    it('TC3: ระบบสามารถกดเพิ่มรายวิชาที่ต้องการเพิ่ม และกรอกข้อมูล และกด Submit ได้', async function(){
        browser.get('http://localhost:8080/');
        browser.sleep(1000);

        let selectUser = element(by.id('studentTitle'));  
        await selectUser.all(by.css('option[value="นาย"]')).click();
        await element(by.id('studentFirstName')).sendKeys('สมชาย');
        await element(by.id('studentLastName')).sendKeys('สุขใจ');
        await element(by.id('studentId')).sendKeys('6500000000');
        await element(by.id('studentYear')).sendKeys('2');
        await element(by.id('studyField')).sendKeys('วิทย์คอม');
        await element(by.id('advisorName')).sendKeys('สมปอง ใจสู้');
        await element(by.id('cause')).sendKeys('คะแนนติดลบ');
        await element(by.id('addressNumber')).sendKeys('123');
        await element(by.id('moo')).sendKeys('3');
        await element(by.id('tumbol')).sendKeys('เมือง');
        await element(by.id('amphur')).sendKeys('เมือง');
        await element(by.id('province')).sendKeys('กระบี่');
        await element(by.id('postalCode')).sendKeys('12345');
        await element(by.id('mobilePhone')).sendKeys('0999999999');
        await element(by.id('phone')).sendKeys('0888888888');

        // Scroll to the Add Course button
        var addButton = element(by.id('add-course'));
        browser.executeScript("window.scrollBy(0, 500)");
        browser.sleep(1000);

        // Click the Add Course button
        addButton.click();

        // Wait for the course field to be visible
        var EC = protractor.ExpectedConditions;
        var courseField = element(by.css('.course-field'));
        browser.wait(EC.visibilityOf(courseField), 3000);
        
        // Check if the course field is displayed
        //expect(courseField.isPresent()).toBeTruthy();


        browser.executeScript("window.scrollBy(0, 500)");
        browser.sleep(1000);
        await element(by.id('subjectCode')).sendKeys('CS000');
        await element(by.id('subjectName')).sendKeys('Testing');
        await element(by.id('subjectSection')).sendKeys('100000');
        await element(by.id('subjectDate')).sendKeys('ศ. 11.00-12.30');
        await element(by.id('subjectCredit')).sendKeys('3');
        await element(by.id('subjectTeacher')).sendKeys('สมหมาย ใจดี');
        await browser.executeScript("arguments[0].click();", element(by.id('subjectTeacherCheck')).getWebElement());

        
        // Scroll to the Submit button
        var submitButton = element(by.css('button[type="submit"]'));
        browser.executeScript("window.scrollBy(0, 1000)");
        browser.sleep(1000);

        // Click the Submit button
        submitButton.click();

        browser.sleep(1000);

        // Check if the validation message is not displayed
        element.all(by.css('.invalid-feedback')).map(function(elem) {
            return elem.isDisplayed();
        }).then(function(displays) {
            // ตรวจสอบค่า displays ทั้งหมด
            displays.forEach(function(display) {
                expect(display).toBeFalsy();
            });
        });
    });

    it('TC4: ระบบสามารถกดเพิ่มรายวิชาที่ต้องการถอน และกรอกข้อมูล และกด submit ได้', async function(){ 
        browser.get('http://localhost:8080/');
        browser.sleep(1000);

        let selectUser = element(by.id('studentTitle'));  
        await selectUser.all(by.css('option[value="นางสาว"]')).click();
        await element(by.id('studentFirstName')).sendKeys('สมหญิง');
        await element(by.id('studentLastName')).sendKeys('มีใจ');
        await element(by.id('studentId')).sendKeys('6400000000');
        await element(by.id('studentYear')).sendKeys('3');
        await element(by.id('studyField')).sendKeys('วิทย์คอม');
        await element(by.id('advisorName')).sendKeys('สมรัก ใจแป่ว');
        await element(by.id('cause')).sendKeys('รักการเรียน');
        await element(by.id('addressNumber')).sendKeys('456');
        await element(by.id('moo')).sendKeys('8');
        await element(by.id('tumbol')).sendKeys('ในเมือง');
        await element(by.id('amphur')).sendKeys('ในเมือง');
        await element(by.id('province')).sendKeys('ภูเก็ต');
        await element(by.id('postalCode')).sendKeys('69870');
        await element(by.id('mobilePhone')).sendKeys('0987654321');
        await element(by.id('phone')).sendKeys('0891236547');

        // Scroll to the Add Course button
        var withdrawButton = element(by.id('withdraw-course'));
        browser.executeScript("window.scrollBy(0, 500)");
        browser.sleep(1000);

        // Click the Add Course button
        withdrawButton.click();

        // Wait for the course field to be visible
        var EC = protractor.ExpectedConditions;
        var withdrawField = element(by.css('.withdraw-field'));
        browser.wait(EC.visibilityOf(withdrawField), 3000);

        // Check if the course field is displayed
        //expect(withdrawField.isPresent()).toBeTruthy();

        browser.executeScript("window.scrollBy(0, 500)");
        browser.sleep(1000);
        await element(by.id('subjectCode')).sendKeys('CS000');
        await element(by.id('subjectName')).sendKeys('Testing');
        await element(by.id('subjectSection')).sendKeys('000000');
        await element(by.id('subjectDate')).sendKeys('พ. 11.00-12.30');
        await element(by.id('subjectCredit')).sendKeys('3');
        await element(by.id('subjectTeacher')).sendKeys('สมจิต ใจเย็น');
        await browser.executeScript("arguments[0].click();", element(by.id('subjectTeacherCheck')).getWebElement());


        // Scroll to the Submit button
        var submitButton = element(by.css('button[type="submit"]'));
        browser.executeScript("window.scrollBy(0, 500)");
        browser.sleep(1000);

        // Click the Submit button
        submitButton.click();

        browser.sleep(1000);
        element.all(by.css('.invalid-feedback')).map(function(elem) {
            return elem.isDisplayed();
        }).then(function(displays) {
            // ตรวจสอบค่า displays ทั้งหมด
            displays.forEach(function(display) {
                expect(display).toBeFalsy();
            });
        });
    });

    it('TC5: ระบบสามารถกดลบรายวิชาที่ต้องการเพิ่มตอนแรกได้',async function(){
        browser.get('http://localhost:8080/');
        browser.sleep(1000);
        // Scroll to the Add Course button
        var addButton = element(by.id('add-course'));
        browser.executeScript("arguments[0].scrollIntoView();", addButton.getWebElement());
        browser.sleep(1000);

        // Click the Add Course button
        addButton.click();

        // Wait for the course field to be visible
        var EC = protractor.ExpectedConditions;
        var courseField = element(by.css('.course-field'));
        browser.wait(EC.visibilityOf(courseField), 3000);

        // Check if the course field is displayed
        //expect(withdrawField.isPresent()).toBeTruthy();

        browser.executeScript("window.scrollBy(0, 500)");
        browser.sleep(1000);

        await element(by.id('subjectCode')).sendKeys('CS000');
        await element(by.id('subjectName')).sendKeys('Testing');
        await element(by.id('subjectSection')).sendKeys('000000');
        await element(by.id('subjectDate')).sendKeys('Fri. 11.00-12.30');
        await element(by.id('subjectCredit')).sendKeys('3');
        await element(by.id('subjectTeacher')).sendKeys('Somsak');

        browser.executeScript("window.scrollBy(0, 200)");
        browser.sleep(1000);
        // Click the Remove button within the course field
        var removeButton = courseField.element(by.css('.remove-course'));
        removeButton.click();

        // Wait for the course field to be removed
        browser.wait(EC.stalenessOf(courseField), 3000);
        // Check if the course field is no longer present
        expect(courseField.isPresent()).toBeFalsy();
    });
    
    it('TC6: ระบบสามารถกดลบรายวิชาที่ต้องการถอนตอนแรกได้',async function(){
        browser.get('http://localhost:8080/');
        browser.sleep(1000);
        // Scroll to the Add Course button
        var withdrawButton = element(by.id('withdraw-course'));
        browser.executeScript("arguments[0].scrollIntoView();", withdrawButton.getWebElement());
        browser.sleep(1000);

        // Click the Add Course button
        withdrawButton.click();

        // Wait for the course field to be visible
        var EC = protractor.ExpectedConditions;
        var withdrawField = element(by.css('.withdraw-field'));
        browser.wait(EC.visibilityOf(withdrawField), 3000);

        // Check if the course field is displayed
        expect(withdrawField.isPresent()).toBeTruthy();

        browser.executeScript("window.scrollBy(0, 600)");
        browser.sleep(1000);
        await element(by.id('subjectCode')).sendKeys('CS000');
        await element(by.id('subjectName')).sendKeys('Testing');
        await element(by.id('subjectSection')).sendKeys('000000');
        await element(by.id('subjectDate')).sendKeys('Fri. 11.00-12.30');
        await element(by.id('subjectCredit')).sendKeys('3');
        await element(by.id('subjectTeacher')).sendKeys('Somsak');
        browser.executeScript("window.scrollBy(0, 200)");
        browser.sleep(1000);
        
        // Click the Remove button within the course field
        var removeButton = withdrawField.element(by.css('.remove-course'));
        removeButton.click();

        // Wait for the course field to be removed
        browser.wait(EC.stalenessOf(withdrawField), 3000);
        // Check if the course field is no longer present
        expect(withdrawField.isPresent()).toBeFalsy();
    });

    /*it("TC7: should submit form data to the server and verify the database", async function () {
        // กรอกข้อมูลลงในฟอร์ม
        await element(by.id("studentTitle")).sendKeys("นาย");
        await element(by.id("studentFirstName")).sendKeys("John");
        await element(by.id("studentLastName")).sendKeys("Doe");
        await element(by.id("studentId")).sendKeys("1234567890");
        await element(by.id("studentYear")).sendKeys("3");
        await element(by.id("studyField")).sendKeys("Computer Science");
        await element(by.id("advisorName")).sendKeys("Dr. Smith");
        await element(by.id("cause")).sendKeys("Request for additional courses");
    
        await element(by.id("addressNumber")).sendKeys("123");
        await element(by.id("moo")).sendKeys("4");
        await element(by.id("tumbol")).sendKeys("Bangkok");
        await element(by.id("amphur")).sendKeys("Bangkok");
        await element(by.id("province")).sendKeys("Bangkok");
        await element(by.id("postalCode")).sendKeys("10100");
        await element(by.id("mobilePhone")).sendKeys("0812345678");
        await element(by.id("phone")).sendKeys("0212345670");
    
        // เพิ่มรายวิชา
        const addCourseButton = element(by.id("add-course"));
        browser.executeScript(
            "arguments[0].scrollIntoView()",
            addCourseButton.getWebElement()
        );
        browser.sleep(1000);
        await element(by.id("add-course")).click();
        await element(by.css(".course-field #subjectCode")).sendKeys("CS101");
        await element(by.css(".course-field #subjectName")).sendKeys(
            "Introduction to Computer Science"
        );
        await element(by.css(".course-field #subjectSection")).sendKeys("A");
        await element(by.css(".course-field #subjectDate")).sendKeys(
            "Monday, 9:00 AM"
        );
        await element(by.css(".course-field #subjectCredit")).sendKeys("3");
        await element(by.css(".course-field #subjectTeacher")).sendKeys(
            "Dr. Johnson"
        );
    
        // รอเว็บไซต์ประมวลผลคำขอ
        await browser.sleep(3000);
    
        // กดปุ่ม Submit
        const submitButton = element(by.css('button[type="submit"].btn.btn-primary'));
        await browser.executeScript(
            "arguments[0].scrollIntoView()",
            submitButton.getWebElement()
        );
        await browser.sleep(1000);
        await submitButton.click();
    
        // ตรวจสอบว่าข้อมูลถูกบันทึกลงในฐานข้อมูล MySQL หรือไม่
        await browser.sleep(3000); // รอฐานข้อมูลประมวลผลข้อมูล
        const mysql = require('mysql');
    
        // สร้าง connection ไปยัง MySQL Database
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'assignment',
            password: '12345',
            database: 'CS262_Database'
        });
    
        // Connect to MySQL Database
        connection.connect();
    
        // ตรวจสอบว่าข้อมูลถูกบันทึกลงในฐานข้อมูล MySQL หรือไม่
        await browser.sleep(3000); // รอฐานข้อมูลประมวลผลข้อมูล

        // สร้างคำสั่ง SQL SELECT เพื่อดึงข้อมูลจากฐานข้อมูล
        const selectQuery = `SELECT * FROM student WHERE studentId = '1234567890'`;
    
        // ส่งคำสั่ง SELECT query ไปยัง MySQL Database
        connection.query(selectQuery, function (error, results, fields) {
        if (error) throw error;
        
        // ตรวจสอบว่ามีข้อมูลที่ถูกส่งไปอยู่ในฐานข้อมูลหรือไม่
        expect(results.length).toBeGreaterThan(0);

        // ตรวจสอบว่าข้อมูลในฐานข้อมูลตรงกับข้อมูลที่ส่งไปหรือไม่
        const studentData = results[0]; // ข้อมูลนักเรียนที่ดึงมาจากฐานข้อมูล
        expect(studentData.studentTitle).toEqual("นาย");
        expect(studentData.studentFirstName).toEqual("John");
        expect(studentData.studentLastName).toEqual("Doe");
        // เพิ่มการตรวจสอบข้อมูลอื่น ๆ ตามต้องการ
        expect(studentData.studentYear).toEqual("3");
        expect(studentData.studyField).toEqual("Computer Science");
        expect(studentData.advisorName).toEqual("Dr. Smith");
        // เพิ่มตรวจสอบข้อมูลอื่น ๆ ตามต้องการ...
        
        // ปิด connection กับฐานข้อมูล
        connection.end();
        });
    });*/
    
    it("TC8:should display error message when form fields are not filled completely", async function () {
        browser.get("http://localhost:8080");
    
        // กรอกข้อมูลเฉพาะบางช่อง ไม่กรอกครบ
        await element(by.id("studentFirstName")).sendKeys("John");
        await element(by.id("studentId")).sendKeys("1234567890");
        browser.sleep(1000);
    
        const submitButton = element(
            by.css('button[type="submit"].btn.btn-primary')
        );
        await browser.executeScript(
            "arguments[0].scrollIntoView()",
            submitButton.getWebElement()
        );
        await browser.sleep(1000);
        await submitButton.click();
    
        // รอเว็บไซต์ประมวลผลคำขอ
        browser.sleep(1000);
    
        // ตรวจสอบว่ามี popup ขึ้นมาหรือไม่
        browser
            .switchTo()
            .alert()
            .then(
            function (alert) {
                // ถ้ามี popup ขึ้นมาให้กด OK เพื่อปิด
                alert.accept();
                browser.sleep(1000);
            },
            function (err) {
                // หากไม่มี popup ขึ้นมาให้เริ่มทำการตรวจสอบข้อความแจ้งเตือน
                var invalidFeedback = element(by.css(".invalid-feedback"));
                invalidFeedback.isPresent().then(function (isPresent) {
                    expect(isPresent).toBe(true);
                });
            }
        );
    });

    it("TC9: should display alert when trying to more than 10 courses", async function () {
        browser.get("http://localhost:8080");
    
        // เพิ่มรายวิชาเกิน 10 รายวิชา
        for (let i = 0; i < 11; i++) {
          // เลื่อนปุ่ม "Add Course" ให้เห็นได้ก่อน
            const addCourseButton = element(by.id("add-course"));
            browser.executeScript(
            "arguments[0].scrollIntoView()",
            addCourseButton.getWebElement()
            );
            browser.sleep(1000);
            await addCourseButton.click();
        }
    
        // รอเว็บไซต์ประมวลผลคำขอ
        browser.sleep(3000);
    
        // ตรวจสอบว่าข้อความแจ้งเตือนขึ้นหรือไม่
        expect(browser.switchTo().alert().getText()).toEqual(
            "You can only add up to 10 courses."
        );
    });

});
