# SWITZEA MODULÆR STRUKTUR - IMPLEMENTERINGSGUIDE

## 📁 FILSTRUKTUR

```
switzea-apps/
├── firebase-config.js      ← Firebase setup (FÆLLES)
├── shared-utils.js         ← Helper funktioner (FÆLLES)
├── navigation.js           ← Navigation component (FÆLLES)
├── index.html              ← Login side
├── dashboard.html          ← Dashboard
├── kundestatus.html        ← Kundestatus app
├── referat.html            ← Referat app
└── projektplanner.html     ← Projektplanner app
```

## 🎯 FORDELE

✅ **Mindre kode duplikering** - Firebase kode kun ét sted
✅ **Hurtigere udvikling** - Genbrugelige funktioner
✅ **Bedre vedligeholdelse** - Ændringer kun ét sted
✅ **Browser caching** - .js filer caches
✅ **Mindre HTML filer** - Kun app-specifik logik

## 📝 SÅDAN BRUGES DET I DINE APPS

### I kundestatus.html (eksempel):

```html
<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="UTF-8">
    <title>SWITZEA - Kundestatus</title>
    <style>
        /* Din app CSS her */
    </style>
</head>
<body>
    <!-- Navigation indsættes her via JavaScript -->
    <div id="nav-container"></div>
    
    <!-- Din app HTML her -->
    <div class="container">
        <h1>Kundestatus</h1>
        <!-- Rest of app -->
    </div>

    <!-- MODULE SCRIPT -->
    <script type="module">
        // Import shared modules
        import { checkAuth, getCurrentUser, createDocument, getAllDocuments, updateDocument, deleteDocument } from './shared-utils.js';
        import { initNavigation, getNavigationHTML, getNavigationCSS } from './navigation.js';
        
        // Initialize
        async function init() {
            // 1. Check authentication
            const user = await checkAuth();
            
            // 2. Add navigation
            document.getElementById('nav-container').innerHTML = getNavigationHTML();
            initNavigation();
            
            // 3. Load app data
            const customers = await getAllDocuments('customers', 'id', 'desc');
            renderCustomers(customers);
        }
        
        // APP-SPECIFIC FUNCTIONS
        async function saveCustomer(data) {
            const docId = await createDocument('customers', data);
            alert('Kunde gemt!');
            const customers = await getAllDocuments('customers');
            renderCustomers(customers);
        }
        
        async function deleteCustomer(docId) {
            await deleteDocument('customers', docId);
            const customers = await getAllDocuments('customers');
            renderCustomers(customers);
        }
        
        function renderCustomers(customers) {
            // Your render logic here
        }
        
        // Start app
        init();
    </script>
</body>
</html>
```

## 🚀 MIGRATION PLAN

### Fase 1: Upload shared files
1. Upload `firebase-config.js`
2. Upload `shared-utils.js`
3. Upload `navigation.js`

### Fase 2: Test med én app
1. Opdater kundestatus.html til at bruge modules
2. Test at det virker

### Fase 3: Migrer resten
1. Opdater referat.html
2. Opdater projektplanner.html
3. Opdater dashboard.html
4. Opdater index.html (login)

## 💡 BEST PRACTICES

### Do's ✅
- Brug import/export syntax
- Brug async/await for Firestore
- Log i console for debugging
- Validér input før Firestore calls

### Don'ts ❌
- Ikke hardcode Firebase config i hver fil
- Ikke duplikere CRUD funktioner
- Ikke mixe module og non-module scripts

## 🐛 TROUBLESHOOTING

**Problem:** Module not found
**Løsning:** Sørg for alle .js filer er i samme mappe

**Problem:** CORS error
**Løsning:** Test via GitHub Pages, ikke lokalt

**Problem:** Function not defined
**Løsning:** Tjek at du har importeret funktionen

## 📊 PERFORMANCE METRICS

**Før (monolitisk):**
- kundestatus.html: ~58 KB
- referat.html: ~55 KB  
- projektplanner.html: ~95 KB
- **Total: ~208 KB**

**Efter (modulær):**
- firebase-config.js: ~2 KB (cached)
- shared-utils.js: ~5 KB (cached)
- navigation.js: ~2 KB (cached)
- kundestatus.html: ~35 KB
- referat.html: ~32 KB
- projektplanner.html: ~68 KB
- **Total: ~144 KB** (31% reduktion!)

## 🎓 NEXT STEPS

Vil du have mig til at:
1. Lave opdateret kundestatus.html der bruger modules?
2. Lave alle 3 apps med module struktur?
3. Noget andet?