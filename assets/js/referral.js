let urlBase = 'https://mmo.baotonghop.online/api/';
let token = getUrlParameter('token');

runReferral()
function reloadData(){
    runReferral()
}
async function runReferral() {
    if (token) {
        $("#loading-request").removeClass("d-none");
        $("#tab-content").addClass("d-none");
        await getConfig(token)
        await getCodeReward(token)
        await getConfigReward(token)
        $("#loading-request").addClass("d-none");
        $("#tab-content").removeClass("d-none");
    } else {
        $("#loading-request").removeClass("d-none");
        $("#tab-content").addClass("d-none");
    }
}
var randomDomain = ""
var codeReferralUser = ""
async function getConfigReward(token) {
    await $.ajax({
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        async: true,
        url: urlBase + 'mission?type=invite_friend',
        processData: false,
        success: function (result, status, xhr) {
            if (result && result.data && result.data[0]) {
                let data = result.data[0]
                if (data.list) {
                    const listData = data.list
                    for (let i in listData) {
                        $("#list-reward").append(
                            `
                                <div class="row reward-details">
                                    <h4 class="col-auto">${formatNumber(listData[i].coin)} đ</h4>
                                    <p class="col text-justify">
                                        ${listData[i].description}
                                    </p>
                                </div>
                            `
                        )
                    }
                }
            }
        },
        error: function (result, status, xhr) {
            alert(result.responseJSON.error)
        }
    });
}
async function getCodeReward(token) {
    await $.ajax({
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        async: true,
        url: urlBase + 'users/get-referral',
        processData: false,
        success: function (result, status, xhr) {
            let totalUser = result.count_referral;
            let totalCoin = result.total_coin_referral;
            let data = result.data;
            codeReferralUser = result.referral_code;
            if (totalUser === '' || totalUser === 0) {
                document.getElementById('example').style.display = 'block';
            }
            document.getElementById('total-user').innerHTML = totalUser;
            document.getElementById('referral-code').value = codeReferralUser;
            document.getElementById('referral-code1').value = codeReferralUser;
            document.getElementById('total-coin').innerHTML = totalCoin + 'xu';
            if (data) {
                $('#list-friend').html('');
                for (let i in data) {
                    if (!data[i].avatar) {
                        data[i].avatar = '/assets/img/avatar-thanh-tran-1.png';
                    }
                    $('#list-friend').append(
                        `
                        <div class="list-friends-income">
                            <div class="avata-name">
                                <img src="${data[i].avatar}" alt="">
                                <h5>${data[i].name}</h5>
                            </div>
                            <span>${data[i].coin_referral}xu</span>
                        </div>
                        `,
                    );
                }
            }
        },
        error: function (result, status, xhr) {
            alert(result.responseJSON.error)
        }
    });
}

async function getConfig(token) {
    await $.ajax({
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        async: true,
        url: urlBase + 'system/config?group=domain',
        processData: false,
        success: function (result, status, xhr) {
            if (result && result.data && result.data.data) {
                let listDomain = Object.assign([], result.data.data)  
                let random = listDomain[Math.floor(Math.random() * listDomain.length)]
                if (random) {
                    randomDomain = random.value
                }
            }
        },
        error: function (result, status, xhr) {
            alert(result.responseJSON.error)
        }
    });
}
function formatNumber(x) {
    return x ? Math.round(Number(x)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0
}
$(document).ready(function () {
    $('.nav-menu a').click(function () {
        $('a').removeClass('active');
        $(this).addClass('active');
    });
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : results[1];
}

var timeout = null;

function copyToClipboard(idInput, idSpan) {
    var copyText = document.getElementById(idInput);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    copyText.disabled = 'true';
    var popup = document.getElementById(idSpan);
    popup.classList.add('show');
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        popup.classList.remove('show');
    }, 1000);
}
randomString = function(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    } 
    return result;
}
function getLinkReferral(domain, code) {
    let linkReferral = "http://" + randomString(3).toLowerCase() + "." + domain + "/share/";
    linkReferral += randomString(10).toLowerCase() + ".html?referral=" + code;
    return linkReferral
}

function doCopy() {
    let popup = document.getElementById('popupBottom');
    popup.classList.add('show');
    const el = document.createElement('textarea');
    el.value = getLinkReferral(randomDomain, codeReferralUser)
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setTimeout(function () {
        popup.classList.remove('show');
    }, 3000);
}
function shareFacebook() {
    let link =  getLinkReferral(randomDomain, codeReferralUser)
    let urlFacebook = "https://www.facebook.com/"
    let inviteText = `Kiếm 1 triệu 1 tuần chưa bao giờ đơn giản đến thế với GoNews. App đọc báo kiếm tiền Online tốt nhất được bình chọn, kiếm tiền nhanh chóng chỉ bằng cách đọc báo đơn giản...\n\nNhập mã mời: ${codeReferralUser} để nhận ngay 5.000 Xu Miễn Phí.\n\nClick đăng ký ngay Link phía dưới để tham gia GoNews ngay nhé!`
    urlFacebook += "sharer/sharer.php?quote=" + encodeURIComponent(inviteText) + "&u=" + encodeURIComponent(link);
    window.open(urlFacebook, "_blank");
}
function shareZalo() {
    window.open('https://zalo.me/', "_blank");
}

