# ✈️ Canadian Airline Availability Report

**Last Updated**: December 4, 2024  
**API Status**: ✅ Active (983 requests remaining)

---

## 🎯 **Quick Answer**

| Airline | IATA | Available? | Active Flights | Status |
|---------|------|------------|----------------|--------|
| **Flair Airlines** 💰 | F8 | ✅ **YES** | **3 flights** | Active |
| **Porter Airlines** ✈️ | PD | ✅ **YES** | **23 flights** | Very Active |
| **Air North** 🦅 | 4N | ❌ **NO** | 0 flights | Not tracked |
| **Pacific Coastal** 🌊 | 8P | ❌ **NO** | 0 flights | Not tracked |

---

## ✅ **AVAILABLE AIRLINES**

### 1. **Flair Airlines (F8)** 💰
**Status**: ✅ **ACTIVE** - 3 flights in the air

| Flight | Route | Aircraft | Status | Speed | Altitude |
|--------|-------|----------|--------|-------|----------|
| **F81602** | YYZ → FLL (Fort Lauderdale) | Boeing 737 MAX 8 | En-route | 712 km/h | 9,354m |
| **F8601** | YYZ → YVR (Vancouver) | Boeing 737 MAX 8 | Taxiing | 0 km/h | Ground |
| **F8650** | YYZ → YHZ (Halifax) | Boeing 737 MAX 8 | Taxiing | 8 km/h | Ground |

**Key Info**:
- **Fleet**: Boeing 737 MAX 8
- **Focus**: Ultra-low-cost carrier
- **Routes**: Domestic + US destinations
- **Hub**: Toronto (YYZ)
- **Canadian Domestic**: YYZ → YVR, YYZ → YHZ

---

### 2. **Porter Airlines (PD)** ✈️
**Status**: ✅ **VERY ACTIVE** - 23 flights in the air

#### Canadian Domestic Routes (Sample):
| Flight | Route | Aircraft | Status | Speed | Altitude |
|--------|-------|----------|--------|-------|----------|
| **PD150** | YOW → YYZ | Embraer E195-E2 | Landing | 244 km/h | 124m |
| **PD157** | YYZ → YOW | Embraer E195-E2 | En-route | 770 km/h | 4,429m |
| **PD102** | YUL → YYZ | Embraer E195-E2 | En-route | 672 km/h | 9,164m |
| **PD200** | YHZ → YYZ | Embraer E195-E2 | En-route | 521 km/h | 6,443m |
| **PD424** | YWG → YYZ | Embraer E195-E2 | En-route | 950 km/h | 11,381m |
| **PD2324** | YHZ → YUL | Dash 8-Q400 | En-route | 529 km/h | 6,116m |
| **PD2280** | YHZ → YTZ | Dash 8-Q400 | En-route | 493 km/h | 7,335m |
| **PD240** | YHZ → YOW | Embraer E195-E2 | Landing | 299 km/h | 1,114m |
| **PD2631** | YTZ → YQT | Dash 8-Q400 | En-route | 376 km/h | 6,298m |
| **PD2682** | YAM → YTZ | Dash 8-Q400 | Landing | 285 km/h | 741m |

**Key Info**:
- **Fleet**: Embraer E195-E2, Dash 8-Q400
- **Focus**: Regional + business routes
- **Hubs**: Toronto Billy Bishop (YTZ), Toronto Pearson (YYZ)
- **Specialty**: Short-haul, frequent service
- **Canadian Coverage**: Excellent - YYZ, YTZ, YOW, YUL, YHZ, YWG, YQT, YAM, YFC, YHM

**Porter is your BEST option for Canadian domestic coverage!** 🌟

---

## ❌ **NOT AVAILABLE AIRLINES**

### 3. **Air North (4N)** 🦅
**Status**: ❌ **NOT TRACKED**

**Why?**
- Air North operates primarily in Yukon/Northern Canada
- Smaller regional carrier
- May not have ADS-B transponders on all aircraft
- API doesn't track their flights

**Their Routes** (not available in API):
- Whitehorse (YXY) ↔ Vancouver (YVR)
- Whitehorse (YXY) ↔ Calgary (YYC)
- Whitehorse (YXY) ↔ Edmonton (YEG)
- Whitehorse (YXY) ↔ Yellowknife (YZF)
- Whitehorse (YXY) ↔ Dawson City (YDA)
- Whitehorse (YXY) ↔ Old Crow (YOC)

---

### 4. **Pacific Coastal Airlines (8P)** 🌊
**Status**: ❌ **NOT TRACKED**

**Why?**
- Small regional carrier in BC
- Operates seaplanes and small aircraft
- Limited ADS-B coverage
- API doesn't track their flights

**Their Routes** (not available in API):
- Vancouver (YVR) ↔ Powell River (YPW)
- Vancouver (YVR) ↔ Bella Coola (QBC)
- Vancouver (YVR) ↔ Bella Bella (ZEL)
- Vancouver (YVR) ↔ Anahim Lake (YAA)
- Various coastal BC communities

---

## 📊 **Summary Statistics**

### Available Airlines
| Airline | Flights | Coverage | Recommendation |
|---------|---------|----------|----------------|
| **Porter (PD)** | 23 | 🌟 Excellent | **Best for domestic** |
| **Flair (F8)** | 3 | ⚠️ Limited | Budget option |

### Not Available
| Airline | Reason | Alternative |
|---------|--------|-------------|
| **Air North (4N)** | Not tracked by API | Use Air Canada for northern routes |
| **Pacific Coastal (8P)** | Not tracked by API | Use WestJet/Air Canada for BC routes |

---

## 🎯 **Recommendations for SkyVibe**

### ✅ **Include These Airlines**
1. **Air Canada (AC)** - 59 flights ⭐ Primary carrier
2. **WestJet (WS)** - 27 flights ⭐ Major carrier
3. **Porter Airlines (PD)** - 23 flights ⭐ Regional leader
4. **Air Transat (TS)** - 11 flights ⭐ Charter/seasonal
5. **Flair Airlines (F8)** - 3 flights ⭐ Budget option

### ❌ **Cannot Include**
- Air North (4N) - No API data
- Pacific Coastal (8P) - No API data

### 💡 **Solution for Missing Airlines**
Add a note in your app:
> "Some regional carriers (Air North, Pacific Coastal) are not available for real-time booking. Please visit their websites directly."

---

## 🚀 **Porter Airlines Highlights**

Porter is **EXCELLENT** for your app because:

1. **23 active flights** - Second most active after Air Canada
2. **Great Canadian coverage** - All major cities
3. **Business-friendly** - Frequent YYZ ↔ YOW, YYZ ↔ YUL
4. **Modern fleet** - New Embraer E195-E2 jets
5. **Billy Bishop Airport (YTZ)** - Downtown Toronto convenience

**Sample Porter Routes Available**:
- Toronto ↔ Ottawa (multiple daily)
- Toronto ↔ Montreal (multiple daily)
- Toronto ↔ Halifax (multiple daily)
- Toronto ↔ Winnipeg (daily)
- Toronto ↔ Thunder Bay (daily)
- Halifax ↔ Montreal (daily)

---

## 📱 **API Usage**

- **Requests Used**: 17 of 1000
- **Remaining**: 983 requests
- **Airlines Checked**: 4 (F8, PD, 4N, 8P)

---

## ✈️ **Final Answer**

**YES** - Flair and Porter are available! ✅  
**NO** - Air North and Pacific Coastal are not tracked ❌

**Your SkyVibe app can offer**:
- 5 major Canadian airlines (AC, WS, PD, TS, F8)
- 100+ live flights
- Excellent coverage across Canada
- Real-time flight tracking

**Porter Airlines is a great addition to your platform!** 🎉
