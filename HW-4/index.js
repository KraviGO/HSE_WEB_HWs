/*
ФИО: Кравченко Игорь Александрович
Группа: БПИ-249
 */

class Book {
    #title;
    #author;
    #year;
    #isIssued;

    constructor(title, author, year, isIssued = false) {
        this.#title = title;
        this.#author = author;
        this.#year = year;
        this.#isIssued = isIssued;
    }

    get title() {
        return this.#title;
    }

    get author() {
        return this.#author;
    }

    get year() {
        return this.#year;
    }

    get isIssued() {
        return this.#isIssued;
    }

    set isIssued(flag) {
        if (typeof(flag) !== "boolean") {
            throw new Error("Значение должно быть true или false.");
        }
        this.#isIssued = flag;
    }

    toggleIssue() {
        this.#isIssued = !this.#isIssued;
        console.log(`Книга теперь ${this.#isIssued ? "выдана" : "доступна"}.`);
    }
}

class EBook extends Book {
    #fileSize;
    #format;

    constructor(title, author, year, fileSize, format) {
        super(title, author, year, true);
        this.#fileSize = fileSize;
        this.format = format;
    }

    get fileSize() {
        return this.#fileSize;
    }

    set fileSize(size) {
        if (typeof size !== "number" || size <= 0) {
            throw new Error("Размер файла - положительное число.");
        }
        this.#fileSize = size;
    }

    get format() {
        return this.#format;
    }

    set format(format) {
        const allowedFormats = ["EPUB", "FB2", "TXT", "MOBI", "KF8", "AZW", "LRF", "DOC", "DOCX", "RTF", "PDF"];
        format = format.toUpperCase();

        if (!allowedFormats.includes(format)) {
            throw new Error("Неизвестный формат книги.");
        }

        this.#format = format;
    }

    toggleIssue() {
        console.log("Электронные книги всегда доступны.");
    }
}

class Library {
    #booksList = [];

    addBook(book) {
        if (!(book instanceof(Book))) {
            throw new Error("Можно добавлять только объекты типа book и EBook.");
        }
        this.#booksList.push(book);
    }

    findBook(arg1, arg2) {
        if (arguments.length === 1 && typeof(arg1) === "string") {
            const book = this.#booksList.find(book => book.title.toLowerCase() === arg1.toLowerCase());

            if (!book) {
                throw new Error("Книга не найдена.");
            }

            return book;
        } else if (arguments.length === 2 && typeof(arg1) === "string" && typeof(arg2) === "number") {
            const book = this.#booksList.find(book => book.author.toLowerCase() === arg1.toLowerCase() && book.year === arg2);

            if (!book) {
                throw new Error("Книга не найдена.");
            }

            return book;
        } else {
            throw new Error("Некорректные аргументы для поиска.");
        }
    }

    listAllBooks() {
        this.#booksList.forEach(book => {
            console.log(`${book.title}. ${book.author} (${book.year}) | ${book.isIssued ? "Выдана" : "Доступна"}`);
        });
    }
}

Object.defineProperty(Book.prototype, "isIssued", {
    configurable: false,
    enumerable: true
});

function testingClasses() {
    // ebooks и books сгенерированы через ChatGPT.
    const ebooks = [
        new EBook("Человек паук", "Петров Б.П.", 2014, 1203, "PDF"),
        new EBook("Гарри Поттер", "Джоан Роулинг", 1997, 2048, "EPUB"),
        new EBook("1984", "Джордж Оруэлл", 1949, 1500, "MOBI"),
        new EBook("Преступление и наказание", "Фёдор Достоевский", 1866, 2300, "FB2"),
        new EBook("Мастер и Маргарита", "Михаил Булгаков", 1967, 2700, "PDF"),
        new EBook("Капитанская дочка", "Александр Пушкин", 1836, 800, "TXT")
    ];

    const books = [
        new Book("Человек паук", "Петров Б.П.", 2014),
        new Book("Гарри Поттер", "Джоан Роулинг", 1997),
        new Book("1984", "Джордж Оруэлл", 1949),
        new Book("Война и мир", "Лев Толстой", 1869),
        new Book("Отцы и дети", "Иван Тургенев", 1862),
        new Book("Анна Каренина", "Лев Толстой", 1877)
    ];

    const library = new Library();

    ebooks.forEach(ebook => library.addBook(ebook));
    books.forEach(book => library.addBook(book));

    console.log("Книги в библиотеке:");
    library.listAllBooks();

    console.log("\nПоиска книг:");
    try {
        console.log(library.findBook("1984"));
        console.log(library.findBook("Лев Толстой", 1869));
        console.log(library.findBook("Неизвестная книга"));
    } catch (error) {
        console.error("Ошибка:", error.message);
    }

    console.log("\nВыдачи и возврата книг:");
    const book1 = library.findBook("Война и мир");
    console.log(`Статус до: ${book1.isIssued ? "Выдана" : "Доступна"}`);
    book1.toggleIssue();
    book1.toggleIssue();

    console.log("\nЭлектронные книги:");
    const ebook1 = library.findBook("Преступление и наказание");
    console.log(`Электронная книга '${ebook1.title}', формат: ${ebook1.format}, размер: ${ebook1.fileSize} KB`);
    ebook1.toggleIssue();
}

testingClasses();

