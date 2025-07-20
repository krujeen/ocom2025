// Chapter page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for TOC links
    const tocLinks = document.querySelectorAll('.toc a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active TOC item
                updateActiveTocItem(this);
            }
        });
    });
    
    // Update active TOC item
    function updateActiveTocItem(activeLink) {
        tocLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    // Scroll spy for TOC
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.content-section[id]');
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const activeTocLink = document.querySelector(`.toc a[href="#${sectionId}"]`);
                if (activeTocLink) {
                    updateActiveTocItem(activeTocLink);
                }
            }
        });
    });
    
    // Add fade-in animation to content sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all content sections and example containers
    const contentSections = document.querySelectorAll('.content-section, .example-container');
    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Print functionality
    const addPrintButton = () => {
        const header = document.querySelector('header .container');
        const printButton = document.createElement('button');
        printButton.textContent = 'พิมพ์หน้านี้';
        printButton.className = 'print-button';
        printButton.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 2rem;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Sarabun', sans-serif;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        `;
        
        printButton.addEventListener('click', () => {
            window.print();
        });
        
        printButton.addEventListener('mouseenter', () => {
            printButton.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        
        printButton.addEventListener('mouseleave', () => {
            printButton.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        header.style.position = 'relative';
        header.appendChild(printButton);
    };
    
    addPrintButton();
    
    // Copy code functionality for examples
    const addCopyButtons = () => {
        const mathElements = document.querySelectorAll('.solution-box p');
        
        mathElements.forEach(element => {
            if (element.innerHTML.includes('$$') || element.innerHTML.includes('$')) {
                const copyButton = document.createElement('button');
                copyButton.textContent = 'คัดลอก';
                copyButton.className = 'copy-button';
                copyButton.style.cssText = `
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    background: #27ae60;
                    color: white;
                    border: none;
                    padding: 0.3rem 0.6rem;
                    border-radius: 3px;
                    cursor: pointer;
                    font-size: 0.8rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                element.style.position = 'relative';
                
                element.addEventListener('mouseenter', () => {
                    copyButton.style.opacity = '1';
                });
                
                element.addEventListener('mouseleave', () => {
                    copyButton.style.opacity = '0';
                });
                
                copyButton.addEventListener('click', () => {
                    const textToCopy = element.textContent || element.innerText;
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        copyButton.textContent = 'คัดลอกแล้ว!';
                        setTimeout(() => {
                            copyButton.textContent = 'คัดลอก';
                        }, 2000);
                    });
                });
                
                element.appendChild(copyButton);
            }
        });
    };
    
    // Wait for MathJax to load before adding copy buttons
    if (window.MathJax) {
        MathJax.startup.promise.then(() => {
            addCopyButtons();
        });
    } else {
        setTimeout(addCopyButtons, 2000);
    }
    
    // Highlight current section in TOC
    const highlightCurrentSection = () => {
        const currentHash = window.location.hash;
        if (currentHash) {
            const currentTocLink = document.querySelector(`.toc a[href="${currentHash}"]`);
            if (currentTocLink) {
                updateActiveTocItem(currentTocLink);
            }
        }
    };
    
    highlightCurrentSection();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Alt + Left Arrow: Previous chapter
        if (e.altKey && e.key === 'ArrowLeft') {
            const prevButton = document.querySelector('.nav-button.prev');
            if (prevButton) {
                prevButton.click();
            }
        }
        
        // Alt + Right Arrow: Next chapter
        if (e.altKey && e.key === 'ArrowRight') {
            const nextButton = document.querySelector('.nav-button.next');
            if (nextButton) {
                nextButton.click();
            }
        }
        
        // Alt + H: Go to home
        if (e.altKey && e.key === 'h') {
            window.location.href = '../index.html';
        }
    });
    
    // Add tooltips for keyboard shortcuts
    const addKeyboardShortcuts = () => {
        const body = document.body;
        const shortcutsDiv = document.createElement('div');
        shortcutsDiv.innerHTML = `
            <div style="position: fixed; bottom: 1rem; left: 1rem; background: rgba(0,0,0,0.8); color: white; padding: 0.5rem; border-radius: 5px; font-size: 0.8rem; z-index: 1000; display: none;" id="shortcuts-tooltip">
                <div>Alt + ← : หน้าก่อน</div>
                <div>Alt + → : หน้าถัดไป</div>
                <div>Alt + H : หน้าหลัก</div>
            </div>
        `;
        body.appendChild(shortcutsDiv);
        
        let shortcutsVisible = false;
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F1') {
                e.preventDefault();
                const tooltip = document.getElementById('shortcuts-tooltip');
                shortcutsVisible = !shortcutsVisible;
                tooltip.style.display = shortcutsVisible ? 'block' : 'none';
            }
        });
    };
    
    addKeyboardShortcuts();
    
    // Add progress indicator
    const addProgressIndicator = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #3498db;
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        });
    };
    
    addProgressIndicator();
    
    // Practice problems interactive features
    const addPracticeFeatures = () => {
        const practiceProblems = document.querySelectorAll('.practice-problem');
        let completedProblems = 0;
        
        // Add toggle solution functionality
        practiceProblems.forEach((problem, index) => {
            const solutionBox = problem.querySelector('.solution-box');
            const approachBox = problem.querySelector('.approach-box');
            
            if (solutionBox && approachBox) {
                // Create toggle buttons
                const toggleApproach = document.createElement('button');
                toggleApproach.textContent = 'แสดงแนวคิด';
                toggleApproach.className = 'toggle-solution';
                toggleApproach.style.marginRight = '0.5rem';
                
                const toggleSolution = document.createElement('button');
                toggleSolution.textContent = 'แสดงเฉลย';
                toggleSolution.className = 'toggle-solution';
                
                // Initially hide solutions
                approachBox.style.display = 'none';
                solutionBox.style.display = 'none';
                
                // Add buttons after problem box
                const problemBox = problem.querySelector('.problem-box');
                const buttonContainer = document.createElement('div');
                buttonContainer.style.padding = '1rem';
                buttonContainer.style.textAlign = 'center';
                buttonContainer.style.background = '#f8f9fa';
                buttonContainer.appendChild(toggleApproach);
                buttonContainer.appendChild(toggleSolution);
                
                problemBox.parentNode.insertBefore(buttonContainer, approachBox);
                
                // Toggle functionality
                let approachVisible = false;
                let solutionVisible = false;
                
                toggleApproach.addEventListener('click', () => {
                    if (approachVisible) {
                        approachBox.style.display = 'none';
                        toggleApproach.textContent = 'แสดงแนวคิด';
                        approachVisible = false;
                    } else {
                        approachBox.style.display = 'block';
                        approachBox.classList.add('solution-visible');
                        toggleApproach.textContent = 'ซ่อนแนวคิด';
                        approachVisible = true;
                    }
                });
                
                toggleSolution.addEventListener('click', () => {
                    if (solutionVisible) {
                        solutionBox.style.display = 'none';
                        toggleSolution.textContent = 'แสดงเฉลย';
                        solutionVisible = false;
                        completedProblems = Math.max(0, completedProblems - 1);
                    } else {
                        solutionBox.style.display = 'block';
                        solutionBox.classList.add('solution-visible');
                        toggleSolution.textContent = 'ซ่อนเฉลย';
                        solutionVisible = true;
                        completedProblems++;
                    }
                    updateProgress();
                });
            }
        });
        
        // Add practice progress tracker
        const addProgressTracker = () => {
            const progressTracker = document.createElement('div');
            progressTracker.className = 'problem-progress';
            progressTracker.innerHTML = `
                <div>ความคืบหน้า</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill"></div>
                </div>
                <div id="progress-text">0/${practiceProblems.length}</div>
            `;
            
            document.body.appendChild(progressTracker);
        };
        
        const updateProgress = () => {
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            
            if (progressFill && progressText) {
                const percentage = (completedProblems / practiceProblems.length) * 100;
                progressFill.style.width = percentage + '%';
                progressText.textContent = `${completedProblems}/${practiceProblems.length}`;
                
                // Change color based on progress
                if (percentage === 100) {
                    progressFill.style.background = '#27ae60';
                } else if (percentage >= 50) {
                    progressFill.style.background = '#f39c12';
                } else {
                    progressFill.style.background = '#3498db';
                }
            }
        };
        
        if (practiceProblems.length > 0) {
            addProgressTracker();
            updateProgress();
        }
        
        // Add difficulty indicators
        const difficulties = ['easy', 'medium', 'easy', 'medium', 'easy', 'medium', 'hard', 'medium', 'hard', 'hard'];
        const difficultyLabels = {
            'easy': 'ง่าย',
            'medium': 'ปานกลาง', 
            'hard': 'ยาก'
        };
        
        practiceProblems.forEach((problem, index) => {
            const h3 = problem.querySelector('h3');
            const difficulty = difficulties[index] || 'medium';
            const difficultySpan = document.createElement('span');
            difficultySpan.className = `problem-difficulty difficulty-${difficulty}`;
            difficultySpan.textContent = difficultyLabels[difficulty];
            h3.appendChild(difficultySpan);
        });
        
        // Add timer functionality
        const addTimer = () => {
            let startTime = Date.now();
            let timerInterval;
            
            const timerDisplay = document.createElement('div');
            timerDisplay.style.cssText = `
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 25px;
                font-family: monospace;
                font-size: 1rem;
                z-index: 1000;
            `;
            timerDisplay.textContent = '00:00';
            document.body.appendChild(timerDisplay);
            
            const updateTimer = () => {
                const elapsed = Date.now() - startTime;
                const minutes = Math.floor(elapsed / 60000);
                const seconds = Math.floor((elapsed % 60000) / 1000);
                timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            };
            
            timerInterval = setInterval(updateTimer, 1000);
            
            // Stop timer when all problems are completed
            const checkCompletion = () => {
                if (completedProblems === practiceProblems.length) {
                    clearInterval(timerInterval);
                    timerDisplay.style.background = '#27ae60';
                    
                    // Show completion message
                    setTimeout(() => {
                        alert(`🎉 ยินดีด้วย! คุณทำข้อสอบครบทุกข้อแล้ว\nเวลาที่ใช้: ${timerDisplay.textContent} นาที`);
                    }, 500);
                }
            };
            
            // Check completion every 2 seconds
            setInterval(checkCompletion, 2000);
        };
        
        if (practiceProblems.length > 0) {
            addTimer();
        }
    };
    
    // Initialize practice features if we're on a page with practice problems
    if (document.querySelector('.practice-problem')) {
        addPracticeFeatures();
    }
});