document.addEventListener('DOMContentLoaded', () => {
    const processBtn = document.getElementById('process-btn');
    const loadSampleBtn = document.getElementById('load-sample-btn');
    const transcriptInput = document.getElementById('transcript-input');
    
    const emptyState = document.getElementById('empty-state');
    const loadingState = document.getElementById('loading-state');
    const resultsState = document.getElementById('results-state');
    const agentStatusText = document.getElementById('agent-status-text');

    const sampleTranscript = `Sarah (PM): Alright team, let's kick off. We need to finalize the Q3 marketing budget. I've looked at the numbers, and I think we should allocate 40% to social and 60% to SEO.
David (Marketing): I agree with the split. But who is actually handling the SEO audit?
Sarah: I think Jessica is. Jessica, can you have the SEO audit report ready by next Wednesday?
Jessica (SEO): Yes, I'm on it. 
Sarah: Great. We also need to decide on the venue for the offsite. 
David: Let's do the resort in Tahoe. 
Sarah: Perfect, decision made. Tahoe it is. Oh, and someone needs to order the new company swag, but we haven't picked a vendor yet. 
Jessica: Should we go with CustomInk or local?
Sarah: That's a good question. Let's figure that out later. Please make sure the swag is ordered soon though.
David: I'll draft the press release for the new feature launch, give me until Friday.`;

    loadSampleBtn.addEventListener('click', () => {
        transcriptInput.value = sampleTranscript;
    });

    processBtn.addEventListener('click', () => {
        if (!transcriptInput.value.trim()) {
            alert("Please paste a transcript first.");
            return;
        }
        
        // Hide empty state, show loading
        emptyState.classList.add('hidden');
        resultsState.classList.add('hidden');
        loadingState.classList.remove('hidden');

        // Simulate agent processing steps
        let step = 0;
        const steps = [
            "Parsing messy transcript...",
            "Identifying speakers and context...",
            "Extracting decisions and action items...",
            "Running confidence check on assignments...",
            "Evaluating missing data for escalation..."
        ];

        const interval = setInterval(() => {
            if (step < steps.length) {
                agentStatusText.innerText = steps[step];
                step++;
            } else {
                clearInterval(interval);
                displayResults();
            }
        }, 600); // 3 seconds total
    });

    function displayResults() {
        loadingState.classList.add('hidden');
        resultsState.classList.remove('hidden');

        // Hardcoded simulation of LLM intelligence based on the sample transcript
        // In a real app, this would be an API call to Gemini/OpenAI
        
        const isSample = transcriptInput.value.includes("Tahoe") || transcriptInput.value.includes("Sarah");
        
        // Populate Decisions
        const decisionsList = document.getElementById('decisions-list');
        decisionsList.innerHTML = isSample ? `
            <li>Marketing budget split: 40% social, 60% SEO.</li>
            <li>Offsite venue selected: Resort in Tahoe.</li>
        ` : `<li>Decisions autonomously extracted from text.</li>`;

        // Populate Action Items (Confident ones)
        const actionItemsList = document.getElementById('action-items-list');
        actionItemsList.innerHTML = isSample ? `
            <div class="action-card">
                <div class="action-header">Complete SEO Audit Report</div>
                <div class="action-meta">
                    <span class="meta-item"><i class="ph ph-user"></i> Jessica</span>
                    <span class="meta-item"><i class="ph ph-calendar"></i> Next Wednesday</span>
                </div>
            </div>
            <div class="action-card">
                <div class="action-header">Draft press release for new feature launch</div>
                <div class="action-meta">
                    <span class="meta-item"><i class="ph ph-user"></i> David</span>
                    <span class="meta-item"><i class="ph ph-calendar"></i> Friday</span>
                </div>
            </div>
        ` : `<div class="action-card">
                <div class="action-header">General Action Item</div>
                <div class="action-meta">
                    <span class="meta-item"><i class="ph ph-user"></i> Context-driven</span>
                    <span class="meta-item"><i class="ph ph-calendar"></i> TBD</span>
                </div>
             </div>`;

        // Populate Open Questions
        const questionsList = document.getElementById('questions-list');
        questionsList.innerHTML = isSample ? `
            <li>Should we go with CustomInk or a local vendor for company swag?</li>
        ` : `<li>Extracted questions from transcript context.</li>`;

        // Escalation Logic Demonstration
        const escalationZone = document.getElementById('escalation-zone');
        const escalatedList = document.getElementById('escalated-list');
        
        if (isSample) {
            escalationZone.classList.remove('hidden');
            escalatedList.innerHTML = `
                <div class="escalated-item" id="esc-1">
                    <div style="font-weight: 500; margin-bottom: 0.25rem;">Order new company swag</div>
                    <div style="font-size: 0.85rem; color: #ef4444;">
                        <i class="ph ph-warning"></i> Missing: Owner, Specific Deadline
                    </div>
                    <div class="escalation-inputs">
                        <input type="text" placeholder="Assign Owner..." id="owner-input">
                        <input type="text" placeholder="Set Deadline..." id="deadline-input">
                        <button class="resolve-btn" onclick="resolveEscalation('esc-1', 'Order new company swag')">Resolve</button>
                    </div>
                </div>
            `;
        } else {
            escalationZone.classList.add('hidden');
        }
    }

    // Global function for the resolve button
    window.resolveEscalation = function(id, taskName) {
        const owner = document.getElementById('owner-input').value || 'Unassigned';
        const deadline = document.getElementById('deadline-input').value || 'TBD';
        
        const escElement = document.getElementById(id);
        escElement.style.display = 'none';

        const actionItemsList = document.getElementById('action-items-list');
        actionItemsList.innerHTML += `
            <div class="action-card" style="border-color: var(--success); background: rgba(16, 185, 129, 0.05);">
                <div class="action-header">${taskName} <span style="font-size: 0.75rem; color: var(--success); font-weight: normal;">(Resolved by Human)</span></div>
                <div class="action-meta">
                    <span class="meta-item"><i class="ph ph-user"></i> ${owner}</span>
                    <span class="meta-item"><i class="ph ph-calendar"></i> ${deadline}</span>
                </div>
            </div>
        `;
        
        // Hide escalation zone if empty
        if(document.querySelectorAll('.escalated-item[style*="display: none"]').length === document.querySelectorAll('.escalated-item').length) {
            document.getElementById('escalation-zone').classList.add('hidden');
        }
    }
});
