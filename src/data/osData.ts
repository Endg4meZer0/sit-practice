export interface OsFamily {
  slug: string;
  name: string;
  logo: string;
  hero: string;
  header: string;
  short: string;
  description: string;
  details: string;
  accent: string;
}

export interface MainTile {
  id: string;
  title: string;
  description: string;
  image: string;
  size: 'small' | 'big';
  gridColumn: number;
  gridRow: number;
  familySlug?: string;
}

export interface GalleryItem {
  id: number;
  slug: string;
  label: string;
  src: string;
}

export interface OsRankRow {
  name: string;
  slug: string;
  family: string;
  score: number;
  popularity: number;
  release: string;
  stability: number;
  marketShare: number;
}

export interface OsListEntry {
  name: string;
  family: string;
  users: number;
  sharePercent: number;
  sharePercentOS: number;
}

const windowsLogo = 'https://thefrisky.com/wp-content/uploads/2019/01/windows-logo-1.png';
const appleLogo = 'https://logospng.org/download/apple/logo-apple-1024.png';
const tuxLogo = 'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png';

export const osFamilies: OsFamily[] = [
  {
    slug: 'windows',
    name: 'Windows',
    logo: windowsLogo,
    hero: windowsLogo,
    header: 'Windows: массовая гибкость и совместимость',
    short: 'Универсальная платформа для десктопов, офисных задач и игр.',
    description:
      'Семейство Windows давно развивается как универсальная платформа. Оно объединяет удобный рабочий стол, привычную навигацию и огромную библиотеку приложений, что делает его подходящим почти для любой задачи.',
    details:
      'Windows ценят за широкую совместимость с железом и программным обеспечением, за регулярные обновления безопасности и гибкие настройки. Эта система остаётся выбором для пользователей, которым важен максимальный набор возможностей на обычных ПК.',
    accent: '#0067b8',
  },
  {
    slug: 'macos',
    name: 'macOS',
    logo: appleLogo,
    hero: appleLogo,
    header: 'macOS: внимание к дизайну и удобству',
    short: 'Плавная и знакомая среда Apple для творческих задач.',
    description:
      'Семейство macOS ориентировано на пользователей Apple: оно предлагает строгий, но понятный интерфейс, глубокую интеграцию с экосистемой и стабильную работу на фирменном оборудовании.',
    details:
      'macOS отличается заботой о визуальном оформлению, мультимедийной поддержке и удобными инструментами для создания контента. На нём просто работать с графикой, видео, музыкой и сетевыми проектами.',
    accent: '#222222',
  },
  {
    slug: 'linux',
    name: 'Linux',
    logo: tuxLogo,
    hero: tuxLogo,
    header: 'Linux: открытая платформа для экспертов',
    short: 'Гибкая система с множеством дистрибутивов и вариаций.',
    description:
      'Linux объединяет семейство свободных систем, в которых главное — свобода настройки. Пользователи могут выбирать качество, производительность и степень контроля, адаптируя систему под собственные потребности.',
    details:
      'Linux часто выбирают за устойчивость, безопасность и возможность глубокого тюнинга. Это хороший выбор для серверных задач, разработчиков и людей, которые хотят управлять каждым аспектом своей ОС.',
    accent: '#4caf50',
  },
];

export const galleryItems: GalleryItem[] = [
  { id: 1, slug: 'windows', label: 'Windows', src: windowsLogo },
  { id: 2, slug: 'macos', label: 'macOS', src: appleLogo },
  { id: 3, slug: 'linux', label: 'Linux', src: tuxLogo },
  { id: 4, slug: 'windows', label: 'Windows', src: windowsLogo },
  { id: 5, slug: 'macos', label: 'macOS', src: appleLogo },
  { id: 6, slug: 'linux', label: 'Linux', src: tuxLogo },
];

export const mainTiles: MainTile[] = [
  {
    id: 'big-1',
    title: 'Заголовок',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis, sapien at blandit varius, diam ante aliquet nulla, at rutrum erat metus vitae lacus.',
    image: windowsLogo,
    size: 'big',
    gridColumn: 1,
    gridRow: 2,
    familySlug: 'windows',
  },
  { id: 'small-2-1', title: 'Заголовок', description: 'Lorem ipsum', image: appleLogo, size: 'small', gridColumn: 2, gridRow: 1 },
  { id: 'small-2-2', title: 'Заголовок', description: 'Lorem ipsum', image: tuxLogo, size: 'small', gridColumn: 2, gridRow: 3 },
  {
    id: 'big-3',
    title: 'Заголовок',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis, sapien at blandit varius, diam ante aliquet nulla, at rutrum erat metus vitae lacus.',
    image: appleLogo,
    size: 'big',
    gridColumn: 3,
    gridRow: 2,
    familySlug: 'macos',
  },
  { id: 'small-4-1', title: 'Заголовок', description: 'Lorem ipsum', image: tuxLogo, size: 'small', gridColumn: 4, gridRow: 1 },
  { id: 'small-4-2', title: 'Заголовок', description: 'Lorem ipsum', image: windowsLogo, size: 'small', gridColumn: 4, gridRow: 3 },
  {
    id: 'big-5',
    title: 'Заголовок',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis, sapien at blandit varius, diam ante aliquet nulla, at rutrum erat metus vitae lacus.',
    image: appleLogo,
    size: 'big',
    gridColumn: 5,
    gridRow: 2,
    familySlug: 'macos',
  },
];

export const listData: OsListEntry[] = [
  { name: 'Windows 11', family: 'Windows', users: 850, sharePercent: 32.1, sharePercentOS: 45.2 },
  { name: 'Windows 10', family: 'Windows', users: 750, sharePercent: 28.3, sharePercentOS: 39.9 },
  { name: 'Windows 7', family: 'Windows', users: 120, sharePercent: 4.5, sharePercentOS: 6.4 },
  { name: 'Windows 8.1', family: 'Windows', users: 60, sharePercent: 2.3, sharePercentOS: 3.2 },
  { name: 'Windows XP', family: 'Windows', users: 15, sharePercent: 0.6, sharePercentOS: 0.8 },
  { name: 'Windows Server', family: 'Windows', users: 85, sharePercent: 3.2, sharePercentOS: 4.5 },
  { name: 'macOS Sonoma', family: 'macOS', users: 95, sharePercent: 3.6, sharePercentOS: 28.8 },
  { name: 'macOS Ventura', family: 'macOS', users: 85, sharePercent: 3.2, sharePercentOS: 25.8 },
  { name: 'macOS Monterey', family: 'macOS', users: 65, sharePercent: 2.5, sharePercentOS: 19.7 },
  { name: 'macOS Big Sur', family: 'macOS', users: 45, sharePercent: 1.7, sharePercentOS: 13.6 },
  { name: 'macOS Catalina', family: 'macOS', users: 25, sharePercent: 0.9, sharePercentOS: 7.6 },
  { name: 'macOS Mojave', family: 'macOS', users: 15, sharePercent: 0.6, sharePercentOS: 4.5 },
  { name: 'Ubuntu', family: 'Linux', users: 45, sharePercent: 1.7, sharePercentOS: 25.0 },
  { name: 'Linux Mint', family: 'Linux', users: 28, sharePercent: 1.1, sharePercentOS: 15.6 },
  { name: 'Debian', family: 'Linux', users: 25, sharePercent: 0.9, sharePercentOS: 13.9 },
  { name: 'Fedora', family: 'Linux', users: 18, sharePercent: 0.7, sharePercentOS: 10.0 },
  { name: 'Arch Linux', family: 'Linux', users: 12, sharePercent: 0.5, sharePercentOS: 6.7 },
  { name: 'openSUSE', family: 'Linux', users: 8, sharePercent: 0.3, sharePercentOS: 4.4 },
  { name: 'Manjaro', family: 'Linux', users: 7, sharePercent: 0.3, sharePercentOS: 3.9 },
  { name: 'CentOS', family: 'Linux', users: 6, sharePercent: 0.2, sharePercentOS: 3.3 },
  { name: 'Pop!_OS', family: 'Linux', users: 5, sharePercent: 0.2, sharePercentOS: 2.8 },
  { name: 'Elementary OS', family: 'Linux', users: 4, sharePercent: 0.2, sharePercentOS: 2.2 },
  { name: 'Zorin OS', family: 'Linux', users: 3, sharePercent: 0.1, sharePercentOS: 1.7 },
  { name: 'Kali Linux', family: 'Linux', users: 3, sharePercent: 0.1, sharePercentOS: 1.7 },
  { name: 'MX Linux', family: 'Linux', users: 3, sharePercent: 0.1, sharePercentOS: 1.7 },
  { name: 'Gentoo', family: 'Linux', users: 2, sharePercent: 0.1, sharePercentOS: 1.1 },
  { name: 'Slackware', family: 'Linux', users: 1, sharePercent: 0.04, sharePercentOS: 0.6 },
  { name: 'Other Linux', family: 'Linux', users: 10, sharePercent: 0.4, sharePercentOS: 5.6 },
];

export const osRankingData: OsRankRow[] = [
  { name: 'Windows 11', slug: 'windows', family: 'Windows', score: 92, popularity: 78, release: '2021', stability: 88, marketShare: 37 },
  { name: 'macOS Sonoma', slug: 'macos', family: 'macOS', score: 89, popularity: 19, release: '2023', stability: 91, marketShare: 16 },
  { name: 'Ubuntu Linux', slug: 'linux', family: 'Linux', score: 81, popularity: 8, release: '2022', stability: 85, marketShare: 4 },
];

export const familyOptions = [{ label: 'Все семейства', value: 'all' }].concat(
  osFamilies.map((family) => ({ label: family.name, value: family.slug }))
);
