/**
 * 数据管理层 - 使用 localStorage 实现前后端数据同步
 * 前端官网读取数据展示，后台管理系统修改数据
 */

const DATA_KEY = 'steel_website_data';

// 默认数据
const DEFAULT_DATA = {
    // 公司信息
    company: {
        name: '鑫光正钢结构有限公司',
        nameEn: 'Xinguangzheng Steel Structure Co., Ltd',
        slogan: '28+年钢结构行业经验',
        sloganEn: '28+ YEARS STEEL STRUCTURE EXPERIENCE',
        description: '我们致力于成为钢结构行业第一品牌。公司成立于1996年，拥有28年专业经验，业务覆盖亚洲、非洲、欧洲、大洋洲及南北美洲等全球市场。',
        phone: '+86-532-8110-8888',
        email: 'info@xgzsteel.com',
        address: '山东省青岛市胶州市胶北办事处',
        founded: '1996',
        employees: '500+',
        projects: '10000+',
        countries: '50+'
    },

    // 产品分类
    productCategories: [
        { id: 1, name: '农业钢结构建筑', nameEn: 'Agriculture Steel Buildings', icon: '🌾' },
        { id: 2, name: '工业钢结构', nameEn: 'Industrial Steel Structure', icon: '🏭' },
        { id: 3, name: '钢结构建筑', nameEn: 'Steel Building', icon: '🏗️' },
        { id: 4, name: '钢结构', nameEn: 'Steel Structure', icon: '🔩' },
        { id: 5, name: '仓储钢结构', nameEn: 'Warehouse Steel Structure', icon: '🏪' }
    ],

    // 产品列表
    products: [
        {
            id: 1,
            name: '工业钢结构车间建筑',
            nameEn: 'Industrial Steel Structure Workshop Building',
            category: '工业钢结构',
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
            isNew: true,
            description: '专业工业钢结构车间设计与建造'
        },
        {
            id: 2,
            name: '钢结构框架玻璃幕墙展厅',
            nameEn: 'Showroom With Steel Structure Frame and Glass Curtain Wall',
            category: '钢结构建筑',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
            isNew: true,
            description: '现代化钢结构框架玻璃幕墙展厅'
        },
        {
            id: 3,
            name: '体育场管桁架钢结构',
            nameEn: 'Pipe Truss Steel Structure For Stadium',
            category: '钢结构',
            image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=300&fit=crop',
            isNew: true,
            description: '大跨度管桁架钢结构体育场'
        },
        {
            id: 4,
            name: '预制钢结构飞机库',
            nameEn: 'Prefabricated Steel Warehouse For Aircraft Hangar',
            category: '仓储钢结构',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
            isNew: true,
            description: '大跨度预制钢结构飞机库'
        },
        {
            id: 5,
            name: '公寓楼轻钢结构设计',
            nameEn: 'Light Steel Structure Design For Apartment Building',
            category: '钢结构建筑',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
            isNew: true,
            description: '轻钢结构住宅公寓楼设计'
        },
        {
            id: 6,
            name: '预制工业仓库钢结构施工',
            nameEn: 'Prefab Industrial Warehouse Steel Structure Construction',
            category: '工业钢结构',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
            isNew: false,
            description: '预制工业仓库钢结构施工'
        }
    ],

    // 项目案例
    projects: [
        {
            id: 1,
            name: '青岛航空技术学院',
            nameEn: 'Qingdao Institute of Aeronautical Technology',
            category: 'Commercial',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop',
            description: '大型钢结构教学楼综合体'
        },
        {
            id: 2,
            name: '宜家家居商场',
            nameEn: 'IKEA Household',
            category: 'Household',
            image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&h=400&fit=crop',
            description: '大型商业钢结构家居商场'
        },
        {
            id: 3,
            name: '体育馆',
            nameEn: 'Sports Hall',
            category: 'Industry',
            image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=400&fit=crop',
            description: '大跨度钢结构体育馆'
        },
        {
            id: 4,
            name: '养殖场',
            nameEn: 'Poultry Farm',
            category: 'Agriculture',
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
            description: '现代化钢结构养殖场'
        },
        {
            id: 5,
            name: '电视工厂大楼',
            nameEn: 'TV Factory Building',
            category: 'Industry',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
            description: '阿尔及利亚钢结构车间及办公楼'
        }
    ],

    // 新闻资讯
    news: [
        {
            id: 1,
            title: '如何规划钢结构车间布局',
            titleEn: 'How To Plan A Steel Structure Workshop Layout',
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop',
            date: '2024-01-15',
            summary: '钢结构车间布局规划是工厂建设的重要环节，合理的布局可以提高生产效率...'
        },
        {
            id: 2,
            title: '重型与轻型钢结构制造对比',
            titleEn: 'Heavy Vs. Light Steel Structure Fabrication Compared',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=250&fit=crop',
            date: '2024-01-10',
            summary: '重钢和轻钢是钢结构建筑的两大主要类型，它们在材料、工艺和应用方面有着显著区别...'
        }
    ],

    // 轮播图
    banners: [
        {
            id: 1,
            title: '钢结构全屋系统',
            subtitle: '28+年钢结构行业经验',
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=800&fit=crop',
            active: true
        },
        {
            id: 2,
            title: '工业钢结构解决方案',
            subtitle: '专业设计·精密制造·全球交付',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&h=800&fit=crop',
            active: true
        },
        {
            id: 3,
            title: '农业钢结构建筑',
            subtitle: '现代化养殖场·温室大棚·粮仓',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=800&fit=crop',
            active: true
        }
    ],

    // 统计数据
    stats: {
        years: '28+',
        projects: '10000+',
        countries: '50+',
        employees: '500+'
    }
};

// 数据管理类
class DataManager {
    constructor() {
        this.data = this.loadData();
    }

    // 加载数据
    loadData() {
        try {
            const stored = localStorage.getItem(DATA_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error('数据加载失败:', e);
        }
        // 首次使用，初始化默认数据
        this.saveData(DEFAULT_DATA);
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }

    // 保存数据
    saveData(data) {
        try {
            localStorage.setItem(DATA_KEY, JSON.stringify(data));
            this.data = data;
            return true;
        } catch (e) {
            console.error('数据保存失败:', e);
            return false;
        }
    }

    // 获取全部数据
    getAll() {
        return this.data;
    }

    // 获取公司信息
    getCompany() {
        return this.data.company;
    }

    // 更新公司信息
    updateCompany(companyData) {
        this.data.company = { ...this.data.company, ...companyData };
        return this.saveData(this.data);
    }

    // 获取产品列表
    getProducts() {
        return this.data.products;
    }

    // 添加产品
    addProduct(product) {
        product.id = this.data.products.length > 0 
            ? Math.max(...this.data.products.map(p => p.id)) + 1 
            : 1;
        this.data.products.push(product);
        return this.saveData(this.data);
    }

    // 更新产品
    updateProduct(id, productData) {
        const index = this.data.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.data.products[index] = { ...this.data.products[index], ...productData };
            return this.saveData(this.data);
        }
        return false;
    }

    // 删除产品
    deleteProduct(id) {
        this.data.products = this.data.products.filter(p => p.id !== id);
        return this.saveData(this.data);
    }

    // 获取项目列表
    getProjects() {
        return this.data.projects;
    }

    // 添加项目
    addProject(project) {
        project.id = this.data.projects.length > 0 
            ? Math.max(...this.data.projects.map(p => p.id)) + 1 
            : 1;
        this.data.projects.push(project);
        return this.saveData(this.data);
    }

    // 更新项目
    updateProject(id, projectData) {
        const index = this.data.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            this.data.projects[index] = { ...this.data.projects[index], ...projectData };
            return this.saveData(this.data);
        }
        return false;
    }

    // 删除项目
    deleteProject(id) {
        this.data.projects = this.data.projects.filter(p => p.id !== id);
        return this.saveData(this.data);
    }

    // 获取新闻列表
    getNews() {
        return this.data.news;
    }

    // 添加新闻
    addNews(newsItem) {
        newsItem.id = this.data.news.length > 0 
            ? Math.max(...this.data.news.map(n => n.id)) + 1 
            : 1;
        this.data.news.push(newsItem);
        return this.saveData(this.data);
    }

    // 更新新闻
    updateNews(id, newsData) {
        const index = this.data.news.findIndex(n => n.id === id);
        if (index !== -1) {
            this.data.news[index] = { ...this.data.news[index], ...newsData };
            return this.saveData(this.data);
        }
        return false;
    }

    // 删除新闻
    deleteNews(id) {
        this.data.news = this.data.news.filter(n => n.id !== id);
        return this.saveData(this.data);
    }

    // 获取轮播图
    getBanners() {
        return this.data.banners;
    }

    // 更新轮播图
    updateBanners(banners) {
        this.data.banners = banners;
        return this.saveData(this.data);
    }

    // 获取统计数据
    getStats() {
        return this.data.stats;
    }

    // 更新统计数据
    updateStats(stats) {
        this.data.stats = { ...this.data.stats, ...stats };
        return this.saveData(this.data);
    }

    // 重置为默认数据
    reset() {
        return this.saveData(JSON.parse(JSON.stringify(DEFAULT_DATA)));
    }
}

// 全局实例
const dataManager = new DataManager();
