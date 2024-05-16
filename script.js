

const teachers = [
    { name: "Aysel Kaplan", subject: "Matematik" },
    { name: "Nejat Çınar", subject: "Türkçe" },
    { name: "Osman Filiz", subject: "Sosyal Bilgiler" },
    { name: "Yasemin Çiçek", subject: "İngilizce" },
    { name: "Hülya İsel", subject: "Fen Bilimleri" },
    { name: "Nedim Babaoğlu", subject: "Din Kültürü" },
    { name: "Özgür Aslan", subject: "Beden Eğitimi" },
    { name: "Ali Yıldız", subject: "Bilişim" },
    { name: "Selin Sarı", subject: "Görsel Sanatlar" },
    { name: "Mehmet Kaya", subject: "Türkçe" },
    { name: "Ali Gümüş", subject: "Matematik" },
    { name: "Kaan Tuna", subject: "Sosyal Bilgiler" },
    { name: "Sema Özdemir", subject: "Fen Bilimleri" },
    { name: "Ayla Sarı", subject: "İngilizce" },
    { name: "Mehmet Kaplan", subject: "Din Kültürü" },
    { name: "Ali Eker", subject: "Görsel Sanatlar" },
    { name: "Gülşah Yıldız", subject: "Bilişim" },
    { name: "Berra Yılmaz", subject: "Beden Eğitimi" },
    { name: "Büşra Kaplan", subject: "Türkçe" },
    { name: "Serdar Atik", subject: "Matematik" },
    { name: "Ayça Günel", subject: "Sosyal Bilgiler" },
    { name: "Meral Işık", subject: "Fen Bilimleri" },
    { name: "Okan Durmuş", subject: "Din Kültürü" },
    { name: "Selda Bozkurt", subject: "Beden Eğitimi" },
    { name: "Aysun Beyaz", subject: "Bilişim" },
    { name: "Yeliz Duman", subject: "Görsel Sanatlar" },
    { name: "Metin Güzel", subject: "Beden Eğitimi" },
    { name: "Ayşe Dikmen", subject: "Türkçe" },
    { name: "Aylin Kayhan", subject: "Matematik" },
    { name: "Tuana Yılmaz", subject: "Sosyal Bilgiler" },
    { name: "Mesut Aydın", subject: "Fen Bilimleri" },
    { name: "Serhat Gündoğu", subject: "İngilizce" },
    { name: "Ela Akil", subject: "Bilişim" }
];

const classes = [
    { name: "5A", level: 5 },
    { name: "5B", level: 5 },
    { name: "5C", level: 5 },
    { name: "5D", level: 5 },
    { name: "5E", level: 5 },
    { name: "5F", level: 5 },
    { name: "5G", level: 5 },
    { name: "6A", level: 6 },
    { name: "6B", level: 6 },
    { name: "6C", level: 6 },
    { name: "6D", level: 6 },
    { name: "6E", level: 6 },
    { name: "6F", level: 6 },
    { name: "6G", level: 6 },
    { name: "7A", level: 7 },
    { name: "7B", level: 7 },
    { name: "7C", level: 7 },
    { name: "7D", level: 7 },
    { name: "7E", level: 7 },
    { name: "7F", level: 7 },
    { name: "7G", level: 7 },
    { name: "8A", level: 8 },
    { name: "8B", level: 8 },
    { name: "8C", level: 8 },
    { name: "8D", level: 8 },
    { name: "8E", level: 8 },
    { name: "8F", level: 8 }
];

const gunler = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];
const saatler = ["1. Ders", "2. Ders", "3. Ders", "4. Ders", "5. Ders", "6. Ders", "7. Ders"];

const program = {};
const ogretmenSaat = {};
let sonders = false;

function createSchedule() {
    for (const classInfo of classes) {
        const className = classInfo.name;

        if (!program[className]) {
            program[className] = {};
        }

        for (const day of gunler) {
            if (!program[className][day]) {
                program[className][day] = {};
            }

            for (const hour of saatler) {
                let randomTeacher;
                do {
                    randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
                } while (
                    ogretmenSaat[randomTeacher.name] >= 35 ||
                    (randomTeacher.subject !== classInfo.subject && (hour === "Beden Eğitimi" || hour === "Görsel Sanatlar")) ||
                    (hour !== "1. Ders" && program[className][day]["1. Ders"] &&
                        program[className][day]["1. Ders"].teacher === randomTeacher.name)
                );

                program[className][day][hour] = {
                    teacher: randomTeacher.name,
                    subject: randomTeacher.subject
                };

                if (!ogretmenSaat[randomTeacher.name]) {
                    ogretmenSaat[randomTeacher.name] = 0;
                }
                ogretmenSaat[randomTeacher.name]++;
            }
        }
    }
}

function displaySchedule() {
    const scheduleBody = document.getElementById("scheduleBody");
    for (const className in program) {
        const row = document.createElement("tr");
        const classCell = document.createElement("td");
        classCell.textContent = className;
        row.appendChild(classCell);

        for (const day of gunler) {
            const dayCell = document.createElement("td");
            const subjects = program[className][day];
            if (subjects) {
                const subjectsArray = Object.values(subjects);
                dayCell.innerHTML = subjectsArray.map(subjectInfo => 
                    `<div class="subject-${subjectInfo.subject.toLowerCase().replace(/ /g, '-')}">${subjectInfo.subject}<br>${subjectInfo.teacher}</div>`
                ).join("");
            }
            row.appendChild(dayCell);
        }
        scheduleBody.appendChild(row);
    }
}

createSchedule();
displaySchedule();
