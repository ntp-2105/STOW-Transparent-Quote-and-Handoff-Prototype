export const copy = {
  vi: {
    header: {
      menu: "Mở menu STOW",
      prototype: "Bản mẫu không chính thức",
      changeLanguage: "Switch to English",
    },
    drawer: {
      close: "Đóng menu",
      newConversation: "Cuộc trò chuyện mới",
      recent: "Gần đây",
      current: "Bản mẫu báo giá minh bạch",
      privacyTitle: "Chế độ demo riêng tư",
      privacyBody: "Không gửi thông tin đến MyStorage hoặc bất kỳ dịch vụ bên ngoài nào.",
    },
    welcome: {
      title: "Xin chào — em là STOW, trợ lý bán hàng AI của MyStorage.",
      intro:
        "Mình có thể hỏi em về MyStorage, các dịch vụ hoặc giá thuê. Bản mẫu này dùng hội thoại dựng sẵn và không kết nối hệ thống thật.",
      about: "Giới thiệu về MyStorage",
      services: "STOW có những dịch vụ gì?",
      quote: "Báo giá lưu trữ giúp em",
      helper: "Chọn một câu hỏi hoặc nhập bên dưới để bắt đầu",
    },
    composer: {
      placeholder: "Hỏi về kho, kích thước, hoặc giá thuê…",
      guidedPlaceholder: "Dùng lựa chọn trong báo giá để tiếp tục…",
      send: "Gửi",
      attach: "Thêm ảnh",
      voice: "Nói trực tiếp",
      unavailable: "Tính năng này không khả dụng trong bản mẫu cục bộ.",
      disclaimer: "STOW có thể nhầm. Anh/chị kiểm tra giá trước khi đặt nhé.",
    },
    chat: {
      aboutPrompt: "Giới thiệu về MyStorage",
      aboutAnswer:
        "MyStorage cung cấp kho tự quản và dịch vụ lưu trữ trọn gói tại TP.HCM. Bản mẫu này tập trung vào hành trình nhận báo giá minh bạch.",
      servicesPrompt: "STOW có những dịch vụ gì?",
      servicesAnswer:
        "Có hai lựa chọn chính: kho tự quản để khách tự ra vào, và kho trọn gói để đội ngũ MyStorage lấy, lưu và giao trả đồ. Hãy chọn báo giá để thử hành trình mẫu.",
      quotePrompt: "Báo giá lưu trữ giúp tôi",
      askInventory:
        "Dạ được ạ. Để ước tính dung tích, anh/chị xác nhận giúp em số lượng đồ cần lưu trữ.",
      inventoryReply: "10–12 thùng vừa, 1 bàn nhỏ không tháo rời và 2–3 vali.",
      recommendation:
        "Với số đồ trên, phương án an toàn là khoảng 3 m³. Bản mẫu sẽ tiếp tục với kho trọn gói trong 3 tháng để minh họa phần báo giá và bàn giao.",
      chooseValet: "Chọn kho trọn gói 3 m³ trong 3 tháng.",
      quoteReady:
        "Trước khi cung cấp thông tin, anh/chị có thể xem rõ khoản đã biết, khoản đang chờ xác minh và khoản chưa bao gồm.",
      contactIntro:
        "Nếu muốn yêu cầu báo giá, hãy kiểm tra thông tin liên hệ mẫu dưới đây. Thao tác này chỉ được mô phỏng trên thiết bị.",
      submitSuccess:
        "Yêu cầu báo giá mẫu đã được ghi nhận. Đây chưa phải là xác nhận đặt kho.",
      submitFailure:
        "Không thể gửi yêu cầu mẫu. Thông tin chưa được xác nhận là đã gửi.",
    },
    actions: {
      startQuote: "Bắt đầu báo giá",
      confirmInventory: "Đúng, dùng danh sách này",
      selectValet: "Chọn kho trọn gói 3 m³",
    },
    quote: {
      title: "Tóm tắt báo giá",
      demoBadge: "Dữ liệu demo",
      intro: "Phân biệt rõ chi phí đã biết với chi phí còn chờ hoặc chưa bao gồm.",
      selectedService: "Dịch vụ đã chọn",
      service: "Kho trọn gói",
      serviceDescription: "MyStorage hỗ trợ lấy, lưu kho và giao trả đồ",
      volume: "3 m³",
      duration: "3 tháng",
      vat: "Đã gồm VAT",
      chargeNames: {
        storage: "Phí lưu kho",
        handling: "Phí bốc xếp khi lấy đồ",
        distance: "Quãng đường lấy đồ",
        delivery: "Giao trả đồ",
      },
      chargeDescriptions: {
        storage: "3 m³ · 3 tháng · đã gồm 8% VAT",
        handling: "3 m³ × 195.000 VND",
        distance: "20.000 VND/km · chưa xác minh địa chỉ",
        delivery: "Báo giá riêng khi khách yêu cầu nhận lại đồ",
      },
      statusLabels: {
        confirmed: "Đã xác nhận",
        calculated: "Đã tính",
        pending: "Chờ xác minh",
        excluded: "Chưa bao gồm",
      },
      pendingAmount: "Đang chờ",
      excludedAmount: "Chưa bao gồm",
      knownSubtotal: "Tạm tính đã biết",
      knownDescription: "Chỉ gồm khoản đã xác nhận và đã tính",
      plusDistance: "+ phí quãng đường",
      warning:
        "Đây không phải số tiền thanh toán cuối cùng. Quãng đường lấy đồ cần được xác minh trước khi hoàn tất báo giá.",
      continue: "Tiếp tục yêu cầu báo giá",
    },
    customer: {
      title: "Kiểm tra thông tin liên hệ",
      demoNote: "Chỉ sử dụng thông tin giả hoặc đã che trong bản mẫu này.",
      name: "Họ và tên",
      phone: "Số điện thoại",
      email: "Email",
      address: "Địa chỉ lấy đồ",
      preferred: "Kênh liên hệ ưu tiên",
      contacts: { email: "Email", phone: "Điện thoại", zalo: "Zalo" },
      submit: "Gửi yêu cầu báo giá",
      submitting: "Đang gửi yêu cầu mẫu…",
      required: "Vui lòng điền trường này.",
      invalidEmail: "Vui lòng nhập địa chỉ email hợp lệ.",
      privacy:
        "Thông tin chỉ tồn tại trong bộ nhớ trình duyệt và không được truyền đi.",
    },
    status: {
      submittedTitle: "Đã gửi yêu cầu báo giá",
      submittedBadge: "Chờ xác minh báo giá",
      submittedBody:
        "Trong hệ thống thật, đội ngũ kinh doanh sẽ xác minh quãng đường và chuẩn bị báo giá chi tiết. Bản mẫu này không tạo yêu cầu thật.",
      failedTitle: "Không thể gửi yêu cầu",
      failedBody:
        "Thông tin chưa được xác nhận là đã gửi. Anh/chị có thể quay lại kiểm tra và thử lại.",
      retry: "Thử lại",
      nextTitle: "Điều gì diễn ra tiếp theo?",
      steps: [
        ["1", "Xác minh quãng đường", "Kiểm tra địa chỉ lấy đồ và chi phí di chuyển."],
        ["2", "Chuẩn bị báo giá chi tiết", "Tổng hợp phí lưu kho và các khoản vận chuyển áp dụng."],
        ["3", "Khách hàng quyết định", "Nhận báo giá không đồng nghĩa với việc đặt kho đã được xác nhận."],
      ],
    },
    a11y: {
      conversation: "Nội dung cuộc trò chuyện",
      assistant: "STOW",
      customer: "Bạn",
      notice: "Thông báo demo",
    },
  },
  en: {
    header: {
      menu: "Open STOW menu",
      prototype: "Unofficial prototype",
      changeLanguage: "Chuyển sang tiếng Việt",
    },
    drawer: {
      close: "Close menu",
      newConversation: "New conversation",
      recent: "Recent",
      current: "Transparent quote prototype",
      privacyTitle: "Private demo mode",
      privacyBody: "No information is sent to MyStorage or any external service.",
    },
    welcome: {
      title: "Hello — I’m STOW, MyStorage’s AI sales assistant.",
      intro:
        "Ask me about MyStorage, its services, or storage pricing. This prototype uses a scripted conversation and is not connected to production systems.",
      about: "About MyStorage",
      services: "What services does STOW cover?",
      quote: "Help me get a storage quote",
      helper: "Choose a question or type below to begin",
    },
    composer: {
      placeholder: "Ask about storage, sizes, or pricing…",
      guidedPlaceholder: "Use the quote actions above to continue…",
      send: "Send",
      attach: "Add image",
      voice: "Talk live",
      unavailable: "This feature is unavailable in the local prototype.",
      disclaimer: "STOW can make mistakes. Check the price before booking.",
    },
    chat: {
      aboutPrompt: "About MyStorage",
      aboutAnswer:
        "MyStorage provides self-storage and full-service storage in Ho Chi Minh City. This prototype focuses on a transparent quotation journey.",
      servicesPrompt: "What services does STOW cover?",
      servicesAnswer:
        "The two main options are self-storage, where customers access their own unit, and full-service storage, where MyStorage collects, stores, and returns items. Choose the quote prompt to try the demo journey.",
      quotePrompt: "Help me get a storage quote",
      askInventory: "Of course. To estimate the volume, please confirm what you need to store.",
      inventoryReply: "10–12 medium boxes, one small non-detachable desk, and 2–3 suitcases.",
      recommendation:
        "For those items, approximately 3 m³ is the safer option. The prototype will continue with three months of full-service storage to demonstrate the quotation and handoff.",
      chooseValet: "Choose 3 m³ of full-service storage for three months.",
      quoteReady:
        "Before sharing any details, you can see what is known, what still needs verification, and what is not included.",
      contactIntro:
        "To request a quotation, review the fictional contact information below. Submission is simulated only on this device.",
      submitSuccess: "The demo quote request was recorded. This is not a confirmed storage booking.",
      submitFailure: "The demo request could not be submitted. Your information is not confirmed as sent.",
    },
    actions: {
      startQuote: "Start a quote",
      confirmInventory: "Yes, use this inventory",
      selectValet: "Choose 3 m³ full service",
    },
    quote: {
      title: "Quote summary",
      demoBadge: "Demo data",
      intro: "Known charges are separated from pending or excluded costs.",
      selectedService: "Selected service",
      service: "Full-service storage",
      serviceDescription: "MyStorage handles pickup, storage, and return",
      volume: "3 m³",
      duration: "3 months",
      vat: "VAT included",
      chargeNames: {
        storage: "Storage",
        handling: "Pickup handling",
        distance: "Pickup distance",
        delivery: "Return delivery",
      },
      chargeDescriptions: {
        storage: "3 m³ · 3 months · 8% VAT included",
        handling: "3 m³ × 195,000 VND",
        distance: "20,000 VND/km · address not verified",
        delivery: "Quoted separately when the items are returned",
      },
      statusLabels: {
        confirmed: "Confirmed",
        calculated: "Calculated",
        pending: "Pending verification",
        excluded: "Not included",
      },
      pendingAmount: "Pending",
      excludedAmount: "Not included",
      knownSubtotal: "Known subtotal",
      knownDescription: "Confirmed and calculated charges only",
      plusDistance: "+ distance fee",
      warning:
        "This is not a final payable amount. The pickup distance must be verified before the detailed quotation is complete.",
      continue: "Continue to quote request",
    },
    customer: {
      title: "Review contact information",
      demoNote: "Use fictional or masked information in this prototype only.",
      name: "Full name",
      phone: "Phone",
      email: "Email",
      address: "Pickup address",
      preferred: "Preferred contact",
      contacts: { email: "Email", phone: "Phone", zalo: "Zalo" },
      submit: "Submit quote request",
      submitting: "Submitting demo request…",
      required: "Please complete this field.",
      invalidEmail: "Please enter a valid email address.",
      privacy: "These details remain in browser memory and are never transmitted.",
    },
    status: {
      submittedTitle: "Quotation request submitted",
      submittedBadge: "Awaiting quote verification",
      submittedBody:
        "In a real system, the business team would verify the distance and prepare a detailed quote. This prototype did not create a real request.",
      failedTitle: "We couldn’t submit your request",
      failedBody:
        "Your information is not confirmed as submitted. Return to the form to review it and try again.",
      retry: "Try again",
      nextTitle: "What happens next?",
      steps: [
        ["1", "Verify pickup distance", "Check the pickup address and distance charge."],
        ["2", "Prepare the detailed quote", "Combine storage with applicable transportation charges."],
        ["3", "You decide whether to continue", "Receiving a quote does not mean the booking is confirmed."],
      ],
    },
    a11y: {
      conversation: "Conversation",
      assistant: "STOW",
      customer: "You",
      notice: "Demo notice",
    },
  },
} as const;

export type Translation = (typeof copy)[keyof typeof copy];
