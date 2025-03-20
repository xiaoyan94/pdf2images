const i18n = {
    zh: {
        title: 'PDF 转高清图片',
        nav: {
            home: '首页',
            help: '帮助',
            toggleTheme: '🌙 切换模式',
            toggleThemeLight: '🌙 切换模式',
            toggleThemeDark: '☀️ 切换模式',
            language: '🌐 Language'
        },
        main: {
            title: 'PDF 转高清 PNG',
            subtitle: '上传 PDF 并转换为高分辨率图片',
            description: '选择 PDF 文件，我们会将其每一页转换为高清 PNG 图片。',
            uploadButton: '选择文件'
        },
        download: {
            all: '下载 {filename}.zip',
            page: '下载 {filename}-第{page}页.png',
            loading: '第 {page} 页加载中...'
        },
        footer: {
            privacy: '隐私政策',
            contact: '联系我们'
        }
    },
    en: {
        title: 'PDF to HD Images',
        nav: {
            home: 'Home',
            help: 'Help',
            toggleTheme: '🌙 Toggle Theme',
            toggleThemeLight: '🌙 Toggle Theme',
            toggleThemeDark: '☀️ Toggle Theme',
            language: '🌐 语言'
        },
        main: {
            title: 'PDF to HD PNG',
            subtitle: 'Upload PDF and Convert to High Resolution Images',
            description: 'Select a PDF file and we will convert each page to high-quality PNG images.',
            uploadButton: 'Choose File'
        },
        download: {
            all: 'Download {filename}.zip',
            page: 'Download {filename}-page{page}.png',
            loading: 'Page {page} loading...'
        },
        footer: {
            privacy: 'Privacy Policy',
            contact: 'Contact Us'
        }
    }
};

function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('language', lang);
    updateContent(lang);
}

function getCurrentLanguage() {
    return localStorage.getItem('language') || 'zh';
}

function getI18nValue(key, lang, params = {}) {
    const keys = key.split('.');
    let value = i18n[lang];
    
    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            return key;
        }
    }

    if (typeof value === 'string') {
        return Object.entries(params).reduce((str, [key, val]) => {
            return str.replace(`{${key}}`, val);
        }, value);
    }
    
    return key;
}

function updateContent(lang) {
    // 更新文档标题
    document.title = getI18nValue('title', lang);
    
    // 更新所有带有data-i18n属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const params = {};
        
        // 获取动态参数
        if (element.hasAttribute('data-i18n-params')) {
            try {
                Object.assign(params, JSON.parse(element.getAttribute('data-i18n-params')));
            } catch (e) {
                console.warn('Invalid data-i18n-params:', e);
            }
        }
        
        // 更新元素内容
        const text = getI18nValue(key, lang, params);
        if (element.tagName.toLowerCase() === 'input' && element.type === 'file') {
            element.title = text;
        } else {
            element.textContent = text;
        }
    });
    
    // 更新主题切换按钮文本
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeToggle = document.getElementById('themeToggle');
    const themeKey = currentTheme === 'dark' ? 'nav.toggleThemeDark' : 'nav.toggleThemeLight';
    themeToggle.textContent = getI18nValue(themeKey, lang);
}

// 导出全局函数
window.i18n = i18n;
window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.updateContent = updateContent;
window.getI18nValue = getI18nValue;