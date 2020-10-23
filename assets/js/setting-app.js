let urlBase = "https://mmo.baotonghop.online/api/";
let token = getUrlParameter('token')

let id = getUrlParameter('id')
getListApp()

async function getListApp(){
    if (token) {
        $("#loading-request").removeClass("d-none");
        await $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + token);
            },
            async: true,
            url: urlBase + "mission" + (id ? "/install-app?id=" + id : ""),
            processData: false,
            success: function (result, status, xhr) {
                isLoading = true;
                isLoading = false;
                if (result && !id) {
                    let data = result.data[4].list;
                    if (data) {
                        for (let i in data) {
                            $("#app").append(
                                `
                                <div class="app container">
                                    <div class="install-app">
                                        <img src=${data[i].icon} alt="">
                                        <div class="app-name">
                                            <h3>
                                                ${data[i].name}
                                            </h3>
                                            <p>Nhận ngay <span>${data[i].coin} xu</span></p>
                                        </div>
                                    </div>
                                    <a href="/layout/setting-app.html?token=${token}&id=${data[i].id}" class="btn-install">Thực hiện</a>
                                </div>
                                `
                            )
                        }
                    }
                }
                if (result && id) {
                    let details = result.data;
                    if (details) {
                        $("#app").html("");
                        for (let i in details) {
                            $("#details").append(
                                `
                            <div class="goshare">
                                <img src=${details[i].icon} alt="">
                                <h2 class="goshare-title">${details[i].name}</h2>
                                <p>Nhận ngay <span>${details[i].coin} xu</span></p>
                                <i class="fas fa-file"></i>
                            </div>
                            <div class="follow-steps">
                                <h2 class="follow-title">
                                    THỰC HIỆN CÁC BƯỚC SAU
                                </h2>
                                <div class="follow-step">
                                    <div>
                                        <span class="step">
                                            B1
                                        </span>
                                    </div>
                                    <div>
                                        <span class="step-content">
                                            Truy cập CH Play hoặc AppStore
                                        </span>
                                    </div>
                                </div>
                                <div class="follow-step">
                                    <div><span class="step">
                                            B2
                                        </span></div>
                                    <div>
                                        <span class="step-content">
                                            Tải app <a href="#">${details[i].description}</a>, Đăng ký tài khoản
                                        </span>
                                    </div>
                                </div>
                                <div class="follow-step">
                                    <div>
                                        <span class="step">
                                            B3
                                        </span>
                                    </div>
                                    <div>
                                        <span class="step-content">
                                            COPY MÃ XÁC NHẬN BÊN DƯỚI
                                        </span>
                                    </div>
                                </div>
                                <div class="follow-step">
                                    <div><span class="step">
                                            B4
                                        </span></div>
                                    <div>
                                        <span class="step-content">
                                            Truy cập vào app MuaLike - >Vào mục <a href="#">“TÀI KHOẢN”</a> nhấn vào <a href="#">“MÃ GIỚI
                                                THIỆU”</a> nhập mã đã copy
                                        </span>
                                    </div>
                                </div>
                                <div class="follow-step">
                                    <div>
                                        <span class="step">
                                            B5
                                        </span>
                                    </div>
                                    <div>
                                        <span class="step-content">
                                            Bấm <a href="#">“HOÀN TẤT”</a> để nhận sao từ GoLike
                                        </span>
                                    </div>
                                </div>
                            </div>
    
                            <h4 class="verification">MÃ XÁC NHẬN</h4>
    
                            <div class="verification-input" id="code-true">
                                <input id="myInput" type="text" value=${details[i].code} />
                                <button onclick="copyToClipboard('myInput', 'myPopup')">
                                    Copy
                                    <span class="popuptext" id="myPopup">Đã copy</span>
                                </button>
                            </div>
                            <div id="code-false">Bạn đã hoàn thành nhiệm vụ</div>
                            <a target="_blank" href=${details[i].link_video} class="btn-tutorial">Clip hướng dẫn</a>
                                `
                            )
                        }
                    }
                }
                return
            },
            error: function (result, status, xhr) {
                alert(result.responseJSON.error)
            }
        })
        $("#loading-request").addClass("d-none");
    } else {
        $("#loading-request").removeClass("d-none");
    }
}

$(document).ready(function () {
    $('.nav-menu a').click(function () {
        $('a').removeClass("active");
        $(this).addClass("active");
    });

});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : results[1];
};

var timeout = null;

function copyToClipboard(idInput, idSpan) {
    var copyText = document.getElementById(idInput);
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    copyText.disabled = "true"
    var popup = document.getElementById(idSpan);
    popup.classList.add('show');
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        popup.classList.remove('show');
    }, 1000);
}

function openHDSD() {
    window.open(
        'https://docbaokiemtien.com/layout/setting-app.html?type=setting-app',
        '_blank' // <- This is what makes it open in a new window.
    );
}